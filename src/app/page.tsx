import WorkerList from "./_components/guest/worker-list";
import ReservationList from "./_components/profile/reservation-list";
import Search from "./_components/search";
import CategoryFilter from "./_components/category-filter";
import SortMode from "./_components/sort-mode";
import Pagination from "./_components/pagination";
import { api } from "@/trpc/server";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    trade?: string;
    sort?: string;
    page?: string;
    limit?: string;
  };
}) {
  const session = await api.auth.getSession();
  const search = searchParams?.search;
  const trades = searchParams?.trade?.split("&");
  const sort = searchParams?.sort;
  const page = searchParams?.page;
  const limit = searchParams?.limit;
  return (
    <div className="container mx-auto">
      <h1 className="mt-8 text-center text-3xl font-bold">SmallHire</h1>
      {session && session.user.role === "WORKER" ? (
        <ReservationList />
      ) : (
        <>
          <p className="mb-10 text-center">Elérhető szakemberek</p>
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
          <Pagination />
        </>
      )}
    </div>
  );
}
