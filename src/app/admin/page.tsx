import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  try {
    await api.admin.get();
  } catch (error) {
    redirect("/admin/login");
  }

  return <div>Admin Page</div>;
};

export default AdminPage;
