"use client";
import { useState } from "react";
import Button from "../../../button";
import AddTradeModal from "./add-trade-modal";

const AddTradeButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Mesterség hozzáadása</Button>
      <AddTradeModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default AddTradeButton;
