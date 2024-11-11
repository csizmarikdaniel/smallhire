"use client";

import { useState } from "react";
import Calendar from "./calendar";
import { type DateRange } from "react-day-picker";
import Textarea from "../form-components/textarea";
import Button from "../button";
import Input from "../form-components/input";
import { useParams } from "next/navigation";

type ReservationFormProps = {
  onReservation: (formData: FormData, selectedDays: DateRange) => Promise<void>;
};

const ReservationForm = ({ onReservation }: ReservationFormProps) => {
  const [selectedDays, setSelectedDays] = useState<DateRange>();
  const [error, setError] = useState("");
  const params = useParams();

  const check = (e: FormData) => {
    if (e.get("description") === "") {
      setError("Add meg a leírást");
      return false;
    }
    if (selectedDays?.from === undefined) {
      setError("Válassz időpontot");
      return false;
    }
    return true;
  };

  return (
    <form
      action={async (e) => {
        if (check(e))
          onReservation(e, selectedDays!).catch(() => setError("error"));
      }}
      className="flex flex-col items-center gap-5"
    >
      <Calendar selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
      <Textarea
        name="description"
        label="Leírás"
        placeholder="Leírás"
        required
      />
      <Input type="file" name="images" multiple />
      <Input type="hidden" name="workerId" value={params.id?.toString()} />
      {error && <p className="mt-5 text-red-500">{error}</p>}
      <Button type="submit">Foglalás</Button>
    </form>
  );
};

export default ReservationForm;
