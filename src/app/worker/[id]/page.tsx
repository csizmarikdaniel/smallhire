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
          <li key={trade.id}>
            {trade.name} ({trade.yearsOfExperience} éves tapasztalat)
          </li>
        ))}
      </ul>
      {session ? (
        session.user.role === "CUSTOMER" && (
          <Button.Link href={`/worker/${id}/reservation`}>Foglalás</Button.Link>
        )
      ) : (
        <Button.Link href={"/login"}>Foglaláshoz jelentkezzen be!</Button.Link>
      )}
    </div>
  );
};

export default WorkerPage;
