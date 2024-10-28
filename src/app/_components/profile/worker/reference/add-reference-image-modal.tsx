import Modal from "@/app/_components/modal";
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
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      type="server"
      action={onupload}
    >
      <Input
        type="file"
        name="images"
        label="Referencia kép(ek) feltöltése"
        multiple
      />
      <Input type="hidden" value={referenceId} name="referenceId" />
    </Modal>
  );
};

export default AddReferenceImageModal;
