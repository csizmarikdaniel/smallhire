import { api } from "@/trpc/server";
import ReferenceCard from "./reference-card";
import AddReferenceButton from "./add-reference-button";

const ReferenceList = async () => {
  const references = await api.worker.reference.list();

  const onCreate = async (formData: FormData) => {
    "use server";
    await api.worker.reference.create(formData);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col rounded-lg bg-white p-5 shadow-xl">
      <h1 className="mb-10 text-center text-3xl">Referenciák</h1>
      {references.length === 0 ? (
        <p className="text-center">Még nincs megadva referencia</p>
      ) : (
        <>
          {references.map((reference) => (
            <ReferenceCard key={reference.id} referenceId={reference.id} />
          ))}
        </>
      )}
      <div className="mx-auto mt-5">
        <AddReferenceButton onCreate={onCreate} />
      </div>
    </div>
  );
};

export default ReferenceList;
