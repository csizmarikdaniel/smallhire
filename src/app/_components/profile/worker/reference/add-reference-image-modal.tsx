import Button from "../../../button";
import Input from "../../../form-components/input";

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
  return (
    <dialog open={open} className="modal">
      <div className="absolute h-screen w-screen bg-black/70" />
      <div className="modal-box flex flex-col gap-4 p-10">
        <form action={onupload}>
          <Input
            type="file"
            name="file"
            label="Referencia kép(ek) feltöltése"
            multiple
          />
          <Input type="hidden" value={referenceId} name="referenceId" />
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

export default AddReferenceImageModal;
