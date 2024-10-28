import Image from "next/image";
import RemoveReferenceImage from "./remove-reference-image";
import AddReferenceImage from "./add-reference-image";
import { api } from "@/trpc/server";

const ReferenceCard = async ({ referenceId }: { referenceId: string }) => {
  const reference = await api.worker.reference.get({ referenceId });
  const onupload = async (formData: FormData) => {
    "use server";
    console.log(formData);
    await api.worker.reference.image.upload(formData);
  };

  return (
    <div className="my-2 flex flex-row justify-between gap-2 rounded-md p-2 shadow-lg">
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
  );
};

export default ReferenceCard;
