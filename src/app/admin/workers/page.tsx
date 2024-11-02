import AdminAddWorker from "@/app/_components/admin/worker/admin-add-worker";
import AdminWorkerRow from "@/app/_components/admin/worker/admin-worker-row";
import CategoryFilter from "@/app/_components/category-filter";
import Pagination from "@/app/_components/pagination";
import Search from "@/app/_components/search";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

type AdminWorkersPageProps = {
  searchParams?: {
    search?: string;
    trade?: string;
    page?: string;
    limit?: string;
  };
};

const AdminWorkersPage = async ({ searchParams }: AdminWorkersPageProps) => {
  try {
    await api.admin.get();
  } catch (error) {
    redirect("/admin/login");
  }

  const search = searchParams?.search;
  const trades = searchParams?.trade?.split("&");
  const limit = parseInt(searchParams?.limit ?? "10");
  const page = parseInt(searchParams?.page ?? "1");

  const { workers, fullListLength } = await api.admin.worker.list({
    search,
    trades,
    limit,
    page,
  });
  return (
    <div>
      <h1 className="my-5 text-center text-3xl">Szakemberek</h1>
      <div className="mx-auto max-w-[1000px]">
        <CategoryFilter />
        <Search />
        <AdminAddWorker />
        {workers.map((worker) => (
          <AdminWorkerRow key={worker.id} worker={worker} />
        ))}
        <Pagination listLength={fullListLength} />
      </div>
    </div>
  );
};

export default AdminWorkersPage;
