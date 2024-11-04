import Link from "next/link";

type WorkerProps = {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  trades: { id: string; name: string }[] | undefined;
  earliestFreeDay: Date | undefined;
};

type WorkerCardProps = {
  worker: WorkerProps;
};

const WorkerCard = ({ worker }: WorkerCardProps) => {
  return (
    <Link href={`/worker/${worker.id}`}>
      <div className="card bg-white shadow-xl transition-all duration-300 hover:bg-sky-100">
        <div className="card-body">
          <h2 className="text-center text-xl font-semibold">{worker.name}</h2>
          <div className="mx-auto flex gap-2">
            {worker.trades?.map((trade) => (
              <div
                key={trade.id}
                className="rounded-full bg-sky-500 px-3 text-white"
              >
                {trade.name}
              </div>
            ))}
          </div>
          <div>
            Legkorábban elérhető:{" "}
            <span className="font-semibold">
              {worker.earliestFreeDay?.toLocaleDateString("hu-HU")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkerCard;
