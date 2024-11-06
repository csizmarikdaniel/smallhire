"use client";
import { api } from "@/trpc/react";
import Button from "../../../button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditTradeForm from "./edit-trade-form";

const TradeCard = ({
  trade,
}: {
  trade: {
    id: string;
    name: string;
    yearsOfExperience: number;
    pricePerHour: number;
  };
}) => {
  const deleteTrade = api.worker.trades.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-between rounded-lg border border-gray-200 p-4 shadow-lg">
      <div className="">
        <div>{trade.name}</div>
        <div>{trade.yearsOfExperience}</div>
      </div>
      <div className="flex items-center">
        <Button onClick={() => setOpen(true)}>Módosítás</Button>
        <Button
          onClick={() => {
            deleteTrade.mutate({ tradeId: trade.id });
          }}
        >
          Törlés
        </Button>
      </div>
      <EditTradeForm open={open} setOpen={setOpen} defaultValues={trade} />
    </div>
  );
};

export default TradeCard;
