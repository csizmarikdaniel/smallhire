"use client";

import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import { api } from "@/trpc/react";
import { useState } from "react";

type RemoveReferenceProps = {
  referenceId: string;
};

const RemoveReference = ({ referenceId }: RemoveReferenceProps) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { mutate } = api.worker.reference.remove.useMutation({
    onSuccess: () => window.location.reload(),
    onError: () =>
      setError("Hiba történt a törlés során! Kérjük próbálja újra!"),
  });

  const onDelete = async () => {
    mutate({
      referenceId: referenceId,
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Törlés</Button>
      <Modal
        open={open}
        onClose={() => {
          if (!error) setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        type="client"
        onSubmit={onDelete}
      >
        <h1 className="text-xl font-bold">
          Biztosan törölni szeretnéd ezt a referenciát?
        </h1>
        {error && <p className="text-red-500">{error}</p>}
      </Modal>
    </>
  );
};

export default RemoveReference;
