import WorkerList from "./_components/guest/worker-list";
import { getSession } from "@/utils/auth";
import ReservationList from "./_components/profile/reservation-list";

export default async function Home() {
  const session = await getSession();
  return (
    <div className="container mx-auto">
      <h1 className="mt-8 text-center text-3xl font-bold">SmallHire</h1>
      {session && session.user.role === "WORKER" ? (
        <ReservationList />
      ) : (
        <>
          <p className="mb-10 text-center">Elérhető szakemberek</p>
          <WorkerList />
        </>
      )}
    </div>
  );
}
