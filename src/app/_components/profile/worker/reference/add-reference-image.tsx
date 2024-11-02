"use client";

import { useState } from "react";
import AddIcon from "../../../icons/add";
import AddReferenceImageModal from "./add-reference-image-modal";

const AddReferenceImage = ({
  onupload,
  referenceId,
}: {
  onupload: (formdata: FormData) => Promise<void>;
  referenceId: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-sky-500 p-2 transition-all duration-300 hover:bg-sky-100"
        onClick={() => setOpen(true)}
      >
        <AddIcon height={40} width={40} />
      </div>
      <AddReferenceImageModal
        onupload={onupload}
        open={open}
        setOpen={setOpen}
        referenceId={referenceId}
      />
    </div>
  );
};

export default AddReferenceImage;
