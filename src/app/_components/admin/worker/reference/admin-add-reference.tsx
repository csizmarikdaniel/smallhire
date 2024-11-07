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
        action={onCreate}
        onClose={() => setIsOpen(false)}
      >
        <h1 className="text-center text-2xl">Új referencia</h1>
        <Input name="description" label="Leírás" />
        <Input name="images" type="file" label="Képek" multiple />
      </Modal>
    </>
  );
};

export default AdminAddReference;
