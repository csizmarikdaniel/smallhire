"use client";

import { api } from "@/trpc/react";
import Button from "../../button";
import { useState } from "react";
import AdminDeleteConfirm from "../admin-delete-confirm";
import EditCustomerForm from "./edit-customer-form";

type AdminCustomerRowProps = {
  customerId: string;
};

const AdminCustomerRow = ({ customerId }: AdminCustomerRowProps) => {
  const customer = api.admin.customer.get.useQuery({ customerId });
  const editCustomer = api.admin.customer.edit.useMutation({
    onSuccess: async () => {
      await customer.refetch();
      setIsEditing(false);
    },
  });
  const deleteCustomer = api.admin.customer.delete.useMutation({
    onSuccess: async () => {
      await customer.refetch();
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    setOpen(true);
  };

  return (
    <>
      {isEditing ? (
        customer.data && (
          <EditCustomerForm
            defaultValues={customer.data}
            setIsEditing={setIsEditing}
            onEdit={editCustomer.mutate}
            error={editCustomer.error?.message}
          />
        )
      ) : (
        <div
          className="my-5 grid grid-cols-3 rounded-lg bg-white p-5 shadow-md"
          key={customer.data?.id}
        >
          <div>
            <h2 className="text-xl font-bold">{customer.data?.name}</h2>
            <p>{customer.data?.email}</p>
            <p>{customer.data?.phone}</p>
          </div>
          <div>
            <p>{customer.data?.address}</p>
            <p>{customer.data?.city}</p>
            <p>{customer.data?.zipCode}</p>
          </div>
          <div className="justify-self-end">
            <Button onClick={() => setIsEditing(true)}>Szerkesztés</Button>
            <Button onClick={onDelete}>Törlés</Button>
          </div>
          {customer.data && (
            <AdminDeleteConfirm
              setOpen={setOpen}
              open={open}
              name={customer.data.name}
              onDelete={() => {
                deleteCustomer.mutate({ customerId: customer.data.id });
                setOpen(false);
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AdminCustomerRow;
