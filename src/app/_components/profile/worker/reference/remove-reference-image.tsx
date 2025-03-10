"use client";

import RemoveIcon from "../../../icons/remove";
import { api } from "@/trpc/react";

type RemoveReferenceImageProps = {
  referenceId: string;
  imageId: string;
};

const RemoveReferenceImage = ({
  referenceId,
  imageId,
}: RemoveReferenceImageProps) => {
  const deleteImage = api.worker.reference.image.delete.useMutation({
    onSuccess: () => window.location.reload(),
    onError: () => {
      alert("Hiba történt a kép törlése közben.");
    },
  });

  return (
    <div
      className="absolute -right-3 -top-3 z-10 rounded-full bg-white p-1 transition-all duration-300 hover:cursor-pointer hover:bg-slate-200"
      onClick={() => deleteImage.mutate({ referenceId, imageId })}
    >
      <RemoveIcon height={20} width={20} />
    </div>
  );
};

export default RemoveReferenceImage;
