import Input from "../form-components/input";
import Modal from "../modal";

const EditProfilePicture = ({
  open,
  setOpen,
  onupload,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onupload: (formData: FormData) => Promise<void>;
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      type="server"
      action={onupload}
    >
      <Input type="file" name="file" label="Profilkép feltöltése" />
    </Modal>
  );
};

export default EditProfilePicture;
