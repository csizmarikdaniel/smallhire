"use client";

import { useState } from "react";
import Button from "../button";
import EditPersonalDataForm from "./edit-personal-data-form";

const EditPersonalData = ({
  data,
}: {
  data: {
    id: string;
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Adatok módosítása</Button>
      <EditPersonalDataForm
        open={open}
        setOpen={setOpen}
        defaultValues={data}
      />
    </div>
  );
};

export default EditPersonalData;
