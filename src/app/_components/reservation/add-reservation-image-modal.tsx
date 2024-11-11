import { useState } from "react";
import Input from "../form-components/input";
import Modal from "../modal";

type AddReservationImageModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onupload: (formData: FormData) => Promise<void>;
  reservationId: string;
};

const AddReservationImageModal = ({
  open,
  setOpen,
  onupload,
  reservationId,
}: AddReservationImageModalProps) => {
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
          setError(undefined);
        } catch (e) {
          if (e instanceof Error) setError(e.message);
        }
      }}
    >
      <Input
        type="file"
        name="images"
        label="Foglaláshoz tartozó kiegészítő kép(ek) feltöltése"
        multiple
      />
      <Input type="hidden" value={reservationId} name="reservationId" />
      {error && <p className="mt-5 text-red-500">{error}</p>}
    </Modal>
  );
};

export default AddReservationImageModal;
