"use client";

import Button from "@/app/_components/button";
import Input from "@/app/_components/form-components/input";
import Modal from "@/app/_components/modal";
import { api } from "@/trpc/react";
import { type AddTradeInput, AddTradeSchema } from "@/types/worker";
import { setNumberValueAs } from "@/utils/form-value-conversion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AdminAddTrade = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const addTrade = api.admin.worker.trade.add.useMutation({
    onSuccess: () => {
      setOpen(false);
      window.location.reload();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTradeInput>({
    resolver: zodResolver(AddTradeSchema),
  });

  const onSubmit = (data: AddTradeInput) => {
    addTrade.mutate({ ...data, workerId: id });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Szakma hozzáadása</Button>
      <Modal
        type="client"
        onClose={() => setOpen(false)}
        open={open}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Szakma hozzáadása</h1>
        <Input
          label="Szakma"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Tapasztalat (év)"
          {...register("yearsOfExperience", { setValueAs: setNumberValueAs })}
          error={errors.yearsOfExperience?.message}
        />
        <Input
          label="Óradíj (Ft/óra)"
          {...register("pricePerHour", { setValueAs: setNumberValueAs })}
          error={errors.pricePerHour?.message}
        />
      </Modal>
    </>
  );
};

export default AdminAddTrade;
