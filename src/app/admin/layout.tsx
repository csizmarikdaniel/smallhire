import { Suspense } from "react";
import AdminNavbar from "../_components/admin/admin-navbar";
import Loading from "../loading";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="mb-5">
        <AdminNavbar />
        {children}
      </div>
    </Suspense>
  );
};

export default AdminLayout;
