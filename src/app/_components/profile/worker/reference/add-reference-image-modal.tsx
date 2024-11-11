import Modal from "@/app/_components/modal";
import Input from "../../../form-components/input";
import { useState } from "react";

const AddReferenceImageModal = ({
  open,
  setOpen,
  onupload,
  referenceId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onupload: (formData: FormData) => Promise<void>;
  referenceId: string;
}) => {
  const [error, setError] = useState<string | undefined>();
  return (
    <Modal
      open={open}
      onClose={() => {
        if (!error) setOpen(false);
      }}
      onCancel={() => setOpen(false)}
      type="server"
      action={async (data) => {
        try {
          await onupload(data);
        } catch (e) {
          if (e instanceof Error) setError(e.message);
        }
      }}
    >
      <Input
        type="file"
        name="images"
        label="Referencia kép(ek) feltöltése"
        multiple
        typeof="image/*"
      />
      <Input type="hidden" value={referenceId} name="referenceId" />
      {error && <p className="mt-5 text-red-500">{error}</p>}
    </Modal>
  );
};

export default AddReferenceImageModal;
