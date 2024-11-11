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
  const [descriptionError, setDescriptionError] = useState<
    string | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  return (
    <Modal
      open={open}
      onClose={() => {
        if (
          error !== undefined &&
          descriptionError !== undefined &&
          error !== "" &&
          descriptionError !== ""
        )
          setOpen(false);
      }}
      onCancel={() => {
        setDescriptionError(undefined);
        setError(undefined);
        setOpen(false);
      }}
      type="server"
      action={async (data) => {
        if (data.get("description") == "") {
          setDescriptionError("Leírás megadása kötelező!");
          return;
        }
        try {
          await onCreate(data);
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
      <Input name="description" label="Leírás" error={descriptionError} />
      <Input type="file" name="images" label="Képek" multiple />
      {error && <p className="mt-5 text-red-500">{error}</p>}
    </Modal>
  );
};

export default AddReferenceModal;
