"use client";

import { api } from "@/trpc/react";
import Button from "../../../button";
import { useState } from "react";
import { type EditTradeInput } from "@/types/worker";
import AdminEditTradeForm from "./admin-edit-trade-form";

const AdminTradeCard = ({ id }: { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
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
      await refetch();
    },
  });

  const onDelete = () => {
    deleteTrade({ tradeId: id });
  };

  const onEdit = (values: EditTradeInput) => {
    editTrade(values);
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg p-5 shadow-lg">
      {isEditing ? (
        data && (
          <AdminEditTradeForm
            defaultValues={data}
            onCancel={() => setIsEditing(false)}
            onEdit={onEdit}
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
            <Button onClick={onDelete}>Törlés</Button>
            <Button onClick={() => setIsEditing(true)}>Szerkesztés</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTradeCard;
