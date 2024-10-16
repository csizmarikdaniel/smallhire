import Button from "../button";
import Input from "../form-components/input";

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
    <dialog open={open} className="modal">
      <div className="absolute h-screen w-screen bg-black/70" />
      <div className="modal-box flex flex-col gap-4 p-10">
        <form action={onupload}>
          <Input
            type="file"
            name="images"
            label="Foglaláshoz tartozó kiegészítő kép(ek) feltöltése"
            multiple
          />
          <Input type="hidden" value={reservationId} name="reservationId" />
          <div className="mt-6 flex justify-end gap-4">
            <Button
              type="submit"
              className="btn-primary"
              onClick={() => setOpen(false)}
            >
              Megerősítés
            </Button>
            <Button type="button" onClick={() => setOpen(false)}>
              Mégse
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddReservationImageModal;
