"use client";

import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import RemoveIcon from "../icons/remove";

const RemoveReservationImage = ({ imageId }: { imageId: string }) => {
  const params = useParams();
  const deleteImage = api.reservation.image.remove.useMutation({
    onSuccess: () => {
      location.reload();
    },
  });
  return (
    <div
      className="absolute -right-3 -top-3 z-10 rounded-full bg-white p-1 transition-all duration-300 hover:cursor-pointer hover:bg-slate-200"
      onClick={() =>
        deleteImage.mutate({
          imageId,
          reservationId: params.id?.toString() ?? "",
        })
      }
    >
      <RemoveIcon height={20} width={20} />
    </div>
  );
};

export default RemoveReservationImage;
