"use client";

import { useState } from "react";
import Modal from "../../modal";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type AddWorkerInput, AddWorkerSchema } from "@/types/admin";
import Input from "../../form-components/input";
import Button from "../../button";

const AdminAddWorker = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const addWorker = api.admin.worker.add.useMutation({
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
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddWorkerInput>({
    resolver: zodResolver(AddWorkerSchema),
  });

  const onSubmit = (data: AddWorkerInput) => {
    addWorker.mutate(data);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Szakember hozzáadása</Button>
      <Modal
        type="client"
        onClose={() => {
          if (!error) setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        open={open}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl">Szakember hozzáadása</h1>
        <Input label="Név" {...register("name")} error={errors.name?.message} />
        <Input
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Jelszó"
          {...register("password")}
          error={errors.password?.message}
          type="password"
        />
        <Input
          label="Telefonszám"
          {...register("phone")}
          error={errors.password?.message}
        />
        <Input
          label="Város"
          {...register("city")}
          error={errors.city?.message}
        />
        <Input
          label="Irányítószám"
          {...register("zipCode")}
          error={errors.zipCode?.message}
        />
        <Input
          label="Cím"
          {...register("address")}
          error={errors.address?.message}
        />
        {error && <div className="mt-5 text-red-500">{error}</div>}
      </Modal>
    </>
  );
};

export default AdminAddWorker;
