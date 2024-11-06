import AdminNavbar from "../_components/admin/admin-navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-5">
      <AdminNavbar />
      {children}
    </div>
  );
};

export default AdminLayout;
