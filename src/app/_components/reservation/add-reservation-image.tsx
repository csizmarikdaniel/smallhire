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
      <div className="h-50 w-50 bg-slate-400 p-2" onClick={() => setOpen(true)}>
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
