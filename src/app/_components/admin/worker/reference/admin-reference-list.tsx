import { api } from "@/trpc/server";
import AdminReferenceCard from "./admin-reference-card";
import AdminAddReference from "./admin-add-reference";

const AdminReferenceList = async ({ id }: { id: string }) => {
  const referenceIds = await api.admin.worker.reference.list({ workerId: id });

  const onupload = async (formData: FormData) => {
    "use server";
    await api.admin.worker.reference.image.add(formData);
  };

  const onCreate = async (formData: FormData) => {
    "use server";
    await api.admin.worker.reference.add({ workerId: id, formData });
  };

  return (
    <div className="rounded-lg bg-white p-5">
      <h2 className="text-center text-xl font-bold">Referenciák</h2>
      <div className="flex flex-col gap-3">
        {referenceIds.map((reference) => (
          <AdminReferenceCard
            key={reference.id}
            id={reference.id}
            onupload={onupload}
          />
        ))}
      </div>
      <AdminAddReference onCreate={onCreate} />
    </div>
  );
};

export default AdminReferenceList;
