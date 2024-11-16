"use client";

import { api } from "@/trpc/react";
import { useState } from "react";
import Button from "../../button";
import EditWorkerForm from "./edit-worker-form";
import { type AdminEditProfileInput } from "@/types/admin";
import Image from "next/image";
import { getImageUrl } from "@/utils/get-image-url";

const UserDataBlock = ({ id }: { id: string }) => {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const { data, refetch } = api.admin.worker.getPersonalData.useQuery({
    workerId: id,
  });
  const { mutate } = api.admin.worker.edit.useMutation({
    onSuccess: async () => {
      setEditing(false);
      await refetch();
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

  const onSubmit = (data: AdminEditProfileInput) => {
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
          error={error}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {data?.image && (
            <Image src={getImageUrl(data?.image)} alt="Profilkép" />
          )}
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
