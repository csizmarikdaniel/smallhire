import { api } from "@/trpc/server";
import CategoryFilter from "../_components/category-filter";
import Search from "../_components/search";
import SortMode from "../_components/sort-mode";
import WorkerList from "../_components/worker/worker-list";
import { redirect } from "next/navigation";

type HomePageProps = {
  searchParams?: {
    search?: string;
    trade?: string;
    sort?: string;
    page?: string;
    limit?: string;
  };
};

const WorkerListPage = async ({ searchParams }: HomePageProps) => {
  const session = await api.auth.getSession();
  if (!session) {
    redirect("/login");
  }

  const search = searchParams?.search;
  const trades = searchParams?.trade?.split("&");
  const sort = searchParams?.sort;
  const page = searchParams?.page;
  const limit = searchParams?.limit;
  return (
    <div className="mx-auto max-w-[1000px]">
      <p className="mb-10 mt-5 text-center text-4xl font-bold">
        Elérhető szakemberek
      </p>
      <div className="flex">
        <div className="grow">
          <Search />
        </div>
        <SortMode />
      </div>
      <CategoryFilter />
      <WorkerList
        search={search}
        trades={trades}
        sort={sort}
        page={parseInt(page ?? "1")}
        limit={parseInt(limit ?? "10")}
      />
    </div>
  );
};
export default WorkerListPage;
