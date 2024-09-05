import Link from "next/link";

type WorkerProps = {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  worker: { trades: { name: string; yearsOfExperience: number }[] } | null;
};

type WorkerCardProps = {
  worker: WorkerProps;
};

const WorkerCard = ({ worker }: WorkerCardProps) => {
  return (
    <Link href={`/worker/${worker.id}`}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{worker.name}</h2>
          <div>
            <h3 className="font-bold">Mesterség</h3>
            <ul>
              {worker.worker?.trades.map((trade) => (
                <li key={trade.name}>
                  {trade.name} ({trade.yearsOfExperience} év)
                </li>
              ))}
            </ul>
          </div>
          <div>
            Legkorábban elérhető: <span className="text-yellow-300">TODO</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkerCard;
