"use client";

import { useState } from "react";
import AddIcon from "../icons/add";
import AddReservationImageModal from "./add-reservation-image-modal";
import { useParams } from "next/navigation";

const AddReservationImage = ({
  onupload,
}: {
  onupload: (formdata: FormData) => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  return (
    <div>
      <div
        className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-sky-500 p-2 transition-all duration-300 hover:bg-sky-100"
        onClick={() => setOpen(true)}
      >
        <AddIcon height={40} width={40} />
      </div>
      <AddReservationImageModal
        onupload={onupload}
        open={open}
        setOpen={setOpen}
        reservationId={params.id?.toString() ?? ""}
      />
    </div>
  );
};

export default AddReservationImage;
