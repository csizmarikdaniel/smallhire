import Button from "@/app/_components/button";
import { api } from "@/trpc/server";
import { getSession } from "@/utils/auth";

const WorkerPage = async ({ params: { id } }: { params: { id: string } }) => {
  const worker = await api.guest.worker.get({ id });
  const session = await getSession();
  return (
    <div>
      <h1 className="text-center text-xl">{worker.name}</h1>
      <p className="text-center">{worker.address}</p>
      <p className="text-center">{worker.city}</p>
      <p className="text-center">{worker.zipCode}</p>
      <h2>Képzettségek</h2>
      <ul>
        {worker.worker?.trades.map((trade) => (
          <li key={trade.name}>
            {trade.name} ({trade.yearsOfExperience} éves tapasztalat)
          </li>
        ))}
      </ul>
      <pre>session {JSON.stringify(session)}</pre>
      {session ? (
        <Button>Foglalás</Button>
      ) : (
        <Button.Link href={"/login"}>Foglaláshoz jelentkezzen be!</Button.Link>
      )}
    </div>
  );
};

export default WorkerPage;
