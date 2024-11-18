"use client";

import { useState } from "react";
import Button from "../../button";
import Modal from "../../modal";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type AddCustomerInput, AddCustomerSchema } from "@/types/admin";
import Input from "../../form-components/input";

const AdminAddCustomer = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addCustomer = api.admin.customer.add.useMutation({
    onSuccess: async () => {
      setOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCustomerInput>({
    resolver: zodResolver(AddCustomerSchema),
  });

  const onSubmit = async (data: AddCustomerInput) => {
    addCustomer.mutate(data);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Új megrendelő</Button>
      <Modal
        open={open}
        onClose={() => {
          if (!error) setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        type="client"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl">Új megrendelő</h1>
        <Input {...register("name")} label="Név" error={errors.name?.message} />
        <Input
          {...register("email")}
          label="Email"
          error={errors.email?.message}
        />
        <Input
          {...register("password")}
          label="Jelszó"
          error={errors.password?.message}
          type="password"
        />
        <Input
          {...register("phone")}
          label="Telefonszám"
          error={errors.phone?.message}
        />
        <Input
          {...register("city")}
          label="Város"
          error={errors.city?.message}
        />
        <Input
          {...register("zipCode")}
          label="Irányítószám"
          error={errors.zipCode?.message}
        />
        <Input
          {...register("address")}
          label="Cím"
          error={errors.address?.message}
        />
        {error && <p className="mt-5 text-red-500">{error}</p>}
      </Modal>
    </>
  );
};

export default AdminAddCustomer;
