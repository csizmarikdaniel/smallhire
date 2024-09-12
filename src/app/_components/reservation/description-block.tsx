"use client";

import { useState } from "react";
import Button from "../button";
import TextArea from "../form-components/textarea";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../form-components/input";

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
  } = useForm({
    defaultValues: {
      description,
      id: reservationId,
    },
    resolver: zodResolver(
      z.object({ id: z.string(), description: z.string().min(1) }),
    ),
  });

  const onSubmit = async (values: { id: string; description: string }) => {
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
          <Input type="hidden" {...register("id")} />
          <Button type="submit" className="mt-2">
            Mentés
          </Button>
        </form>
      ) : (
        <>
          <p>{description}</p>
          <Button onClick={() => setIsEditing(true)} className="mt-2">
            Módosítás
          </Button>
        </>
      )}
    </div>
  );
};

export default DescriptionBlock;
