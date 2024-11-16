"use client";

import { useState } from "react";
import Input from "../../form-components/input";
import Button from "../../button";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import {
  type EditReservationUserInput,
  EditReservationUserSchema,
} from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";

type ReservationWorkerProps = {
  worker: { email: string; name: string };
  reservationId: string;
};

const ReservationWorker = ({
  worker,
  reservationId,
}: ReservationWorkerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editWorker = api.admin.reservation.editWorker.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditReservationUserInput>({
    defaultValues: { email: worker.email, reservationId: reservationId },
    resolver: zodResolver(EditReservationUserSchema),
  });

  const onEdit = (values: EditReservationUserInput) => {
    editWorker.mutate({
      email: values.email,
      reservationId: reservationId,
    });
  };

  return (
    <div className="rounded-lg bg-white p-5">
      {isEditing ? (
        worker.email &&
        worker.name && (
          <div>
            <h2 className="text-2xl">Szakember</h2>
            <Input
              label="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            {error && <p className="mt-5 text-red-500">{error}</p>}
            <Button onClick={handleSubmit(onEdit)}>Mentés</Button>
            <Button onClick={() => setIsEditing(false)}>Mégsem</Button>
          </div>
        )
      ) : (
        <div>
          <h2 className="text-2xl">Szakember</h2>
          <div className="flex flex-col gap-2">
            <p>Email: {worker.email}</p>
            <p>Név: {worker.name}</p>
            <Button onClick={() => setIsEditing(true)}>Szerkesztés</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationWorker;
