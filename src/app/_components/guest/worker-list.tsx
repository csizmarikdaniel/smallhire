import { api } from "@/trpc/server";
import WorkerCard from "./worker-card";

const WorkerList = async ({
  search,
  trades,
  sort,
  page,
  limit,
}: {
  search?: string;
  trades?: string[];
  sort?: string;
  page?: number;
  limit?: number;
}) => {
  const workers = await api.guest.worker.list({
    search,
    trades,
    sort,
    page,
    limit,
  });
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  );
};

export default WorkerList;
