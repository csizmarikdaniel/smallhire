import { api } from "@/trpc/server";
import ReferenceCard from "./reference-card";

const ReferenceList = async () => {
  const references = await api.worker.reference.list();
  return (
    <div className="mx-auto w-full max-w-[1000px] rounded-lg p-5 shadow-xl">
      <h1 className="mb-10 text-center text-3xl">Referenciák</h1>
      {references.map((reference) => (
        <ReferenceCard key={reference.id} referenceId={reference.id} />
      ))}
    </div>
  );
};

export default ReferenceList;
