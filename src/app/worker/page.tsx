import CategoryFilter from "../_components/category-filter";
import Search from "../_components/search";
import SortMode from "../_components/sort-mode";
import WorkerList from "../_components/worker/worker-list";

type HomePageProps = {
  searchParams?: {
    search?: string;
    trade?: string;
    sort?: string;
    page?: string;
    limit?: string;
  };
};

const WorkerListPage = ({ searchParams }: HomePageProps) => {
  const search = searchParams?.search;
  const trades = searchParams?.trade?.split("&");
  const sort = searchParams?.sort;
  const page = searchParams?.page;
  const limit = searchParams?.limit;
  return (
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
    </>
  );
};
export default WorkerListPage;
