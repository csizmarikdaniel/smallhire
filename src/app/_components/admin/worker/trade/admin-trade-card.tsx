"use client";

import { api } from "@/trpc/react";
import Button from "../../../button";
import { useState } from "react";
import { type EditTradeInput } from "@/types/worker";
import AdminEditTradeForm from "./admin-edit-trade-form";
import AdminDeleteConfirm from "../../admin-delete-confirm";

type AdminTradeCardProps = {
  id: string;
};

const AdminTradeCard = ({ id }: AdminTradeCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { data, refetch } = api.admin.worker.trade.get.useQuery({
    tradeId: id,
  });
  const { mutate: deleteTrade } = api.admin.worker.trade.delete.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const { mutate: editTrade } = api.admin.worker.trade.edit.useMutation({
    onSuccess: async () => {
      setIsEditing(false);
      await refetch();
    },
    onError: (error) => {
      if (
        error.message.startsWith("[") &&
        JSON.parse(error.message) instanceof Array
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        setError(JSON.parse(error.message)[0].message);
      } else {
        setError(error.message);
      }
    },
  });

  const onDelete = () => {
    deleteTrade({ tradeId: id });
  };

  const onEdit = (values: EditTradeInput) => {
    editTrade(values);
  };

  return (
    <div className="rounded-lg p-5 shadow-lg">
      {isEditing ? (
        data && (
          <AdminEditTradeForm
            defaultValues={data}
            onCancel={() => setIsEditing(false)}
            onEdit={onEdit}
            error={error}
          />
        )
      ) : (
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold">{data?.name}</h2>
            <div>Tapasztalat: {data?.yearsOfExperience} év</div>
          </div>
          <div>
            Órabér:
            <div>{data?.pricePerHour} Ft/óra</div>
          </div>
          <div>
            <Button onClick={() => setOpen(true)}>Törlés</Button>
            {open && data && (
              <AdminDeleteConfirm
                name={data.name}
                onDelete={onDelete}
                open={open}
                setOpen={setOpen}
              />
            )}
            <Button onClick={() => setIsEditing(true)}>Szerkesztés</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTradeCard;
