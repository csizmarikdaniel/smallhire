import Button from "@/app/_components/button";
import { api } from "@/trpc/server";
import { getImageUrl } from "@/utils/get-image-url";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "@/app/loading";

const WorkerPage = async ({ params: { id } }: { params: { id: string } }) => {
  const worker = await api.worker.get({ workerId: id });
  const session = await api.auth.getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-auto max-w-[1000px]">
        <div className="mt-5 rounded-lg bg-white p-5">
          <h1 className="text-center text-3xl">{worker.name}</h1>
          <div className="my-3 flex justify-center">
            {worker.images[0] && (
              <Image
                src={getImageUrl(worker.images[0].url)}
                width={200}
                height={200}
                alt="Szakember profilképe"
              />
            )}
          </div>
          <p className="text-center">{worker.address}</p>
          <p className="text-center">{worker.city}</p>
          <p className="text-center">{worker.zipCode}</p>
        </div>
        <div className="mt-5 rounded-lg bg-white p-5">
          <h2 className="text-center text-xl">Képzettségek</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Szakma</th>
                <th>Tapasztalat(év)</th>
                <th>Óradíj (Ft/óra)</th>
              </tr>
            </thead>
            <tbody>
              {worker.worker?.trades.map((trade) => (
                <tr key={trade.id}>
                  <td>{trade.name}</td>
                  <td>{trade.yearsOfExperience}</td>
                  <td>{trade.pricePerHour}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center text-xs">
            Az árak tájékoztó jellegűek! A munka tényleges áráról a szakembertől
            kap majd ajánlatot!
          </p>
        </div>
        <div className="mt-10 text-center">
          <Button.Link
            href={`/worker/${id}/reservation`}
            className="px-7 py-5 text-2xl"
          >
            Foglalás
          </Button.Link>
        </div>
      </div>
    </Suspense>
  );
};

export default WorkerPage;
