import { useState } from "react";
import Input from "../form-components/input";
import Modal from "../modal";

type EditProfilePictureProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onupload: (formData: FormData) => Promise<boolean | undefined>;
};

const EditProfilePicture = ({
  open,
  setOpen,
  onupload,
}: EditProfilePictureProps) => {
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
          window.location.reload();
        } catch (e) {
          if (e instanceof Error) setError(e.message);
        }
      }}
    >
      <Input
        type="file"
        name="image"
        label="Profilkép feltöltése"
        accept="image/*"
      />
      {error && <p className="mt-5 text-red-500">{error}</p>}
    </Modal>
  );
};

export default EditProfilePicture;
