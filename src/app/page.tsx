import { HydrateClient } from "@/trpc/server";
import WorkerList from "./_components/guest/worker-list";
import { getSession } from "@/utils/auth";

export default async function Home() {
  const session = await getSession();
  return (
    <HydrateClient>
      <div className="container mx-auto">
        <h1 className="mt-8 text-center text-3xl font-bold">
          Welcome to the Worker List
        </h1>
        <WorkerList />
      </div>
      <pre>session {JSON.stringify(session, null, 2)}</pre>
    </HydrateClient>
  );
}
