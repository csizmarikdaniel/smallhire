import Image from "next/image";
import RemoveReferenceImage from "./remove-reference-image";
import AddReferenceImage from "./add-reference-image";
import { api } from "@/trpc/server";
import RemoveReference from "./remove-reference";
import EditReference from "./edit-reference";

const ReferenceCard = async ({ referenceId }: { referenceId: string }) => {
  const reference = await api.worker.reference.get({ referenceId });
  const onupload = async (formData: FormData) => {
    "use server";
    await api.worker.reference.image.upload(formData);
  };

  return (
    <div className="rounded-md p-5 shadow-lg">
      <div className="flex flex-row justify-between gap-2">
        <div className="">
          <p className="font-bold">Leírás:</p>
          <p>{reference.description}</p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row flex-wrap gap-3">
            {reference.image.map((image) => (
              <div key={image.url} className="h-50 w-100 relative">
                <Image
                  src={`https://utfs.io/f/${image.url}`}
                  alt="Referencia kép"
                  height={50}
                  width={100}
                />
                <RemoveReferenceImage
                  imageId={image.id}
                  referenceId={reference.id}
                />
              </div>
            ))}
            <AddReferenceImage onupload={onupload} referenceId={reference.id} />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-start gap-2">
        <EditReference reference={reference} />
        <RemoveReference referenceId={reference.id} />
      </div>
    </div>
  );
};

export default ReferenceCard;
