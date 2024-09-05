"use client";

import { useState } from "react";
import Button from "../button";
import EditPersonalDataForm from "./edit-personal-data-form";

const EditPersonalData = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Adatok módosítása</Button>
      <EditPersonalDataForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default EditPersonalData;
