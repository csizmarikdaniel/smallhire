"use client";

import { useState } from "react";
import AddReferenceModal from "./add-reference-modal";
import Button from "../../button";

const AddReferenceButton = ({
  onCreate,
}: {
  onCreate: (formdata: FormData) => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Referencia hozzáadása</Button>
      <AddReferenceModal open={open} setOpen={setOpen} onCreate={onCreate} />
    </div>
  );
};

export default AddReferenceButton;
