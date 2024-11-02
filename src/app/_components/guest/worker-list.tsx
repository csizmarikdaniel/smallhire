import { api } from "@/trpc/server";
import WorkerCard from "./worker-card";
import Pagination from "../pagination";

type WorkerListProps = {
  search?: string;
  trades?: string[];
  sort?: string;
  page?: number;
  limit?: number;
};

const WorkerList = async ({
  search,
  trades,
  sort,
  page,
  limit,
}: WorkerListProps) => {
  const { workers, fullListLength } = await api.guest.worker.list({
    search,
    trades,
    sort,
    page,
    limit,
  });
  return (
    <div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {workers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
      <Pagination listLength={fullListLength} />
    </div>
  );
};

export default WorkerList;
