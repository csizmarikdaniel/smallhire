import AdminReferenceList from "@/app/_components/admin/worker/reference/admin-reference-list";
import AdminTradesList from "@/app/_components/admin/worker/trade/admin-trades-list";
import UserDataBlock from "@/app/_components/admin/worker/user-data-block";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const AdminWorkerPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  try {
    await api.admin.get();
  } catch (error) {
    redirect("/login");
  }

  return (
    <div>
      <div className="mx-auto flex max-w-[1000px] flex-col gap-4">
        <UserDataBlock id={id} />
        <AdminTradesList id={id} />
        <AdminReferenceList id={id} />
      </div>
    </div>
  );
};

export default AdminWorkerPage;
