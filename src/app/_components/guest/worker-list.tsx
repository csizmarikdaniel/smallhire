import { api } from "@/trpc/server";
import WorkerCard from "./worker-card";

const WorkerList = async () => {
  const workers = await api.guest.worker.list();
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  );
};

export default WorkerList;
