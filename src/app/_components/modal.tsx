import Button from "./button";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  type: "client" | "server" | undefined;
  onSubmit?: () => void;
  action?: (formData: FormData) => Promise<void>;
};

const Modal = ({
  children,
  open,
  onClose,
  type,
  onSubmit,
  action,
}: ModalProps) => {
  if (type === "client") {
    if (!onSubmit) {
      throw new Error("onSubmit is required when type is client");
    }
    return (
      <dialog open={open} className="modal">
        <div className="absolute h-screen w-screen bg-black/70" />
        <div className="modal-box flex flex-col gap-4 p-10">
          <form onSubmit={onSubmit}>
            {children}

            <div className="mt-6 flex justify-end gap-4">
              <Button type="submit" className="btn-primary">
                Megerősítés
              </Button>
              <Button type="button" onClick={onClose}>
                Mégse
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    );
  } else if (type === "server") {
    return (
      <dialog open={open} className="modal">
        <div className="absolute h-screen w-screen bg-black/70" />
        <div className="modal-box flex flex-col gap-4 p-10">
          <form action={action}>
            {children}

            <div className="mt-6 flex justify-end gap-4">
              <Button type="submit" className="btn-primary" onClick={onClose}>
                Megerősítés
              </Button>
              <Button type="button" onClick={onClose}>
                Mégse
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    );
  } else {
    return (
      <dialog open={open} className="modal">
        <div className="absolute h-screen w-screen bg-black/70" />
        <div className="modal-box flex flex-col gap-4 p-10">{children}</div>
      </dialog>
    );
  }
};

export default Modal;
