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
    <Link
      href={`/worker/${worker.id}`}
      className="flex flex-row justify-between"
    >
      <div>
        <h2 className="text-xl">{worker.name}</h2>
      </div>
      <div>
        <h3>Trades</h3>
        <ul>
          {worker.worker?.trades.map((trade) => (
            <li key={trade.name}>
              {trade.name} ({trade.yearsOfExperience} years)
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default WorkerCard;
