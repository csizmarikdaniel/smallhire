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
  const [error, setError] = useState<string | undefined>();
  const addTrade = api.admin.worker.trade.add.useMutation({
    onSuccess: () => {
      setOpen(false);
      window.location.reload();
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
      <Button onClick={() => setOpen(true)} className="mt-5">
        Mesterség hozzáadása
      </Button>
      <Modal
        type="client"
        onClose={() => {
          if (!error) setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        open={open}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl">Mesterség hozzáadása</h1>
        <Input label="Név" {...register("name")} error={errors.name?.message} />
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
        {error && <div className="mt-5 text-red-500">{error}</div>}
      </Modal>
    </>
  );
};

export default AdminAddTrade;
