"use client";

import { useState } from "react";
import Button from "../button";
import TextArea from "../form-components/textarea";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../form-components/input";
import {
  EditDescriptionInput,
  EditDescriptionSchema,
} from "@/types/reservation";

type DescriptionBlockProps = {
  description: string;
  reservationId: string;
};

const DescriptionBlock = ({
  description,
  reservationId,
}: DescriptionBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const editDescription = api.reservation.description.edit.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDescriptionInput>({
    defaultValues: {
      description,
      reservationId,
    },
    resolver: zodResolver(EditDescriptionSchema),
  });

  const onSubmit = async (values: EditDescriptionInput) => {
    editDescription.mutate(values);
    setIsEditing(false);
  };
  return (
    <div>
      <h2 className="mb-5 mt-10 text-xl">Feladat leírása</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextArea
            {...register("description")}
            error={errors.description?.message}
          />
          <Input type="hidden" {...register("reservationId")} />
          <div className="mt-2 flex gap-2">
            <Button type="submit">Mentés</Button>
            <Button onClick={() => setIsEditing(false)}>Mégse</Button>
          </div>
        </form>
      ) : (
        <>
          <p>{description}</p>
          <Button onClick={() => setIsEditing(true)} className="mt-2">
            Leírás módosítása
          </Button>
        </>
      )}
    </div>
  );
};

export default DescriptionBlock;
