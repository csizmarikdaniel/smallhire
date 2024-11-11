"use client";

import Button from "@/app/_components/button";
import Input from "@/app/_components/form-components/input";
import Modal from "@/app/_components/modal";
import { api } from "@/trpc/react";
import { EditReferenceInput, EditReferenceSchema } from "@/types/worker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

type EditReferenceProps = {
  reference: {
    id: string;
    description: string;
  };
};

const EditReference = ({ reference }: EditReferenceProps) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { mutate } = api.worker.reference.edit.useMutation({
    onSuccess: () => window.location.reload(),
    onError: () =>
      setError("Hiba történt a mentés során! Kérjük próbálja újra!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditReferenceInput>({
    resolver: zodResolver(EditReferenceSchema),
    defaultValues: {
      referenceId: reference.id,
      description: reference.description,
    },
  });

  const onSubmit = (data: EditReferenceInput) => {
    mutate(data);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Leírás szerkesztése</Button>
      <Modal
        open={open}
        onClose={() => {
          if (!error) setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        type="client"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-bold">Referencia szerkesztése</h1>
        <Input {...register("referenceId")} type="hidden" />
        <Input
          label="Leírás"
          {...register("description")}
          error={errors.description?.message}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </Modal>
    </>
  );
};

export default EditReference;
