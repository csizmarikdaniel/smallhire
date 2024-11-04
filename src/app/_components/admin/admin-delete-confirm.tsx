import Modal from "../modal";

const AdminDeleteConfirm = ({
  name,
  setOpen,
  open,
  onDelete,
}: {
  name: string;
  setOpen: (open: boolean) => void;
  open: boolean;
  onDelete: () => void;
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      type="client"
      onSubmit={onDelete}
    >
      <h2 className="text-xl font-bold">
        Biztosan törölni szeretné a következő bejegyzést?
      </h2>
      <p>{name}</p>
    </Modal>
  );
};

export default AdminDeleteConfirm;
