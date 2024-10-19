import Button from "../../../button";
import Input from "../../../form-components/input";

const AddReferenceModal = ({
  open,
  setOpen,
  onCreate,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreate: (formData: FormData) => Promise<void>;
}) => {
  return (
    <dialog open={open} className="modal">
      <div className="absolute h-screen w-screen bg-black/70" />
      <div className="modal-box flex flex-col gap-4 p-10">
        <form action={onCreate}>
          <Input name="description" label="Leírás" />
          <Input type="file" name="images" label="Képek" multiple />
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

export default AddReferenceModal;
