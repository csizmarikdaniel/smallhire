import Modal from "@/app/_components/modal";
import Input from "../../../form-components/input";
import { useState } from "react";

const AddReferenceModal = ({
  open,
  setOpen,
  onCreate,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreate: (formData: FormData) => Promise<void>;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  return (
    <Modal
      open={open}
      onClose={() => {
        setError(undefined);
      }}
      onCancel={() => {
        setError(undefined);
        setOpen(false);
      }}
      type="server"
      action={async (data) => {
        try {
          await onCreate(data);
          setOpen(false);
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
    >
      <h1 className="text-2xl">Referencia hozzáadása</h1>
      <Input name="description" label="Leírás" />
      <Input type="file" name="images" label="Képek" multiple />
      {error && <p className="mt-5 text-red-500">{error}</p>}
    </Modal>
  );
};

export default AddReferenceModal;
