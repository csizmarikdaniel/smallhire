import Button from "../../button";

type AdminWorkerRowProps = {
  worker: {
    id: string;
    name: string;
    worker: { trades: { name: string; yearsOfExperience: number }[] } | null;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
};

const AdminWorkerRow = ({ worker }: AdminWorkerRowProps) => {
  return (
    <div className="my-5 grid grid-cols-3 rounded-lg bg-white p-5 shadow-md">
      <div>
        <h2 className="text-xl font-bold">{worker.name}</h2>
        <p>{worker.email}</p>
        <p>{worker.phone}</p>
      </div>
      <div>
        <p>{worker.address}</p>
        <p>{worker.city}</p>
        <p>{worker.zipCode}</p>
      </div>
      <div className="flex flex-col">
        {worker.worker?.trades && worker.worker?.trades.length > 0 ? (
          <div className="flex flex-wrap items-start gap-2">
            {worker.worker?.trades.map((trade) => (
              <div
                key={trade.name}
                className="rounded-full bg-sky-500 px-3 text-white"
              >
                {trade.name}
              </div>
            ))}
          </div>
        ) : (
          <p>Nincs megadva mesterség</p>
        )}
        <Button.Link href={`/admin/workers/${worker.id}`}>
          Részletek
        </Button.Link>
      </div>
    </div>
  );
};

export default AdminWorkerRow;
