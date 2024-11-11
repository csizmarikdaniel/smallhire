"use client";

import Button from "@/app/_components/button";
import Input from "@/app/_components/form-components/input";
import Modal from "@/app/_components/modal";
import { useState } from "react";

type AdminAddReferenceProps = {
  onCreate: (formData: FormData) => Promise<void>;
};

const AdminAddReference = ({ onCreate }: AdminAddReferenceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  return (
    <>
      <div className="mt-5 flex justify-center">
        <Button onClick={() => setIsOpen(true)}>
          Új referencia hozzáadása
        </Button>
      </div>
      <Modal
        open={isOpen}
        type="server"
        action={async (data) => {
          try {
            await onCreate(data);
            setError(undefined);
          } catch (error) {
            if (error instanceof Error) {
              if (error.message.startsWith("[")) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                setError(JSON.parse(error.message)[0].message);
              } else {
                setError(error.message);
              }
            }
          }
        }}
        onClose={() => {
          if (!error) {
            setIsOpen(false);
          }
        }}
        onCancel={() => setIsOpen(false)}
      >
        <h1 className="text-center text-2xl">Új referencia</h1>
        <Input name="description" label="Leírás" />
        <Input name="images" type="file" label="Képek" multiple />
        {error && <p className="mt-5 text-red-500">{error}</p>}
      </Modal>
    </>
  );
};

export default AdminAddReference;
