import Input from "../form-components/input";
import Modal from "../modal";

const AddReservationImageModal = ({
  open,
  setOpen,
  onupload,
  reservationId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onupload: (formData: FormData) => Promise<void>;
  reservationId: string;
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      type="server"
      action={onupload}
    >
      <Input
        type="file"
        name="images"
        label="Foglaláshoz tartozó kiegészítő kép(ek) feltöltése"
        multiple
      />
      <Input type="hidden" value={reservationId} name="reservationId" />
    </Modal>
  );
};

export default AddReservationImageModal;
