"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import Button from "../../button";
import { type EditUserInput } from "@/types/profile";
import EditWorkerForm from "./edit-worker-form";

const UserDataBlock = ({ id }: { id: string }) => {
  const [editing, setEditing] = useState(false);

  const { data, refetch } = api.admin.worker.getPersonalData.useQuery({
    workerId: id,
  });
  const { mutate } = api.admin.worker.edit.useMutation({
    onSuccess: async () => {
      setEditing(false);
      await refetch();
    },
  });

  const onSubmit = (data: EditUserInput) => {
    mutate(data);
  };

  return (
    <div className="rounded-lg bg-white p-5 shadow-lg">
      <h1 className="mb-7 text-center text-2xl">{data?.name}</h1>
      {editing && data ? (
        <EditWorkerForm
          defaultValues={data}
          onSubmit={onSubmit}
          onClose={() => setEditing(false)}
        />
      ) : (
        <div className="flex flex-col gap-3">
          <div>Email: {data?.email}</div>
          <div>Telefonszám: {data?.phone}</div>
          <div>Cím: {data?.address}</div>
          <div>Város: {data?.city}</div>
          <div>Irányítószám: {data?.zipCode}</div>
          <Button onClick={() => setEditing(true)}>Szerkesztés</Button>
        </div>
      )}
    </div>
  );
};

export default UserDataBlock;
