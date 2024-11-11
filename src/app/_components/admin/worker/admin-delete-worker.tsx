"use client";

import { api } from "@/trpc/react";

import Button from "../../button";
import { useState } from "react";
import AdminDeleteConfirm from "../admin-delete-confirm";

type AdminDeleteWorkerProps = {
  workerId: string;
  name: string;
};

const AdminDeleteWorker = ({ workerId, name }: AdminDeleteWorkerProps) => {
  const deleteWorker = api.admin.worker.delete.useMutation({
    onSuccess: async () => {
      window.location.reload();
    },
  });
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    deleteWorker.mutate({ workerId });
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Törlés</Button>
      {open && (
        <AdminDeleteConfirm
          name={name}
          onDelete={onDelete}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default AdminDeleteWorker;
