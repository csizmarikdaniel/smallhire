import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import Button from "../_components/button";

const AdminPage = async () => {
  try {
    await api.admin.get();
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="flex h-[calc(100vh-68px)] flex-col items-center justify-center">
      <h1 className="mb-10 text-center text-5xl">SmallHire Admin</h1>
      <div className="flex gap-3">
        <Button.Link href="/admin/workers">Szakemberek</Button.Link>
        <Button.Link href="/admin/customers">Megrendelők</Button.Link>
      </div>
    </div>
  );
};

export default AdminPage;
