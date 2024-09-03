import { api } from "@/trpc/server";
import WorkerCard from "./worker-card";

const WorkerList = async () => {
  const workers = await api.guest.worker.list();
  return (
    <div className="flex flex-col gap-2">
      {workers.map((worker) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  );
};

export default WorkerList;
