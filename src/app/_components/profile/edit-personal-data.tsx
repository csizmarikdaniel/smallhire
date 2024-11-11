"use client";

import { useState } from "react";
import Button from "../button";
import Modal from "../modal";
import Input from "../form-components/input";
import { useForm } from "react-hook-form";
import { EditUserInput, EditUserSchema } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";

type EditPersonalDataProps = {
  data: {
    id: string;
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
};

const EditPersonalData = ({ data }: EditPersonalDataProps) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const editPersonalData = api.profile.update.useMutation({
    onSuccess: () => {
      setOpen(false);
      window.location.reload();
    },
    onError: () => {
      setError("Hiba történt a mentés során! Kérjük próbálja újra!");
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditUserInput>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      address: data.address,
      city: data.city,
      zipCode: data.zipCode,
      phone: data.phone,
    },
  });

  const onSubmit = async (data: EditUserInput) => {
    editPersonalData.mutate(data);
  };

  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Adatok módosítása</Button>
      <Modal
        open={open}
        onClose={() => {
          if (!error) setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        type="client"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...register("name")} label="Név" error={errors.name?.message} />
        <Input value={data.email} label="Email" disabled />
        <Input
          {...register("address")}
          label="Cím"
          error={errors.address?.message}
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
          {...register("phone")}
          label="Telefonszám"
          error={errors.phone?.message}
        />
        <Input type="hidden" {...register("id")} />
        {error && <p className="mt-5 text-red-500">{error}</p>}
      </Modal>
    </div>
  );
};

export default EditPersonalData;
