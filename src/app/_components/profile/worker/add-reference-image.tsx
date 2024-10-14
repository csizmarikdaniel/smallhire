"use client";

import { useState } from "react";
import AddIcon from "../../icons/add";
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
      <div className="h-50 w-50 bg-slate-400 p-2" onClick={() => setOpen(true)}>
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
