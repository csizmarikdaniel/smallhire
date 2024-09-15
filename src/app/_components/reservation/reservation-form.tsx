"use client";

import { useState } from "react";
import Calendar from "./calendar";
import { type DateRange } from "react-day-picker";
import Textarea from "../form-components/textarea";
import Button from "../button";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";

const ReservationForm = ({
  sessionUser,
}: {
  sessionUser: { id: string; role: string };
}) => {
  const [selectedDays, setSelectedDays] = useState<DateRange>();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const reserve = api.reservation.create.useMutation({
    onSuccess: () => {
      router.push("/my-profile");
    },
  });
  const params = useParams();

  const onSubmit = () => {
    if (selectedDays?.from === undefined) {
      setError("Válassz időpontot!");
      return;
    } else if (description === "") {
      setError("Add meg a leírást!");
      return;
    }

    reserve.mutate({
      customerId: sessionUser.id,
      description: description,
      endDate: selectedDays?.to ?? selectedDays.from,
      startDate: selectedDays.from,
      workerId: params.id?.toString() ?? "",
    });
  };
  return (
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Calendar selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
      <Textarea
        name="description"
        label="Leírás"
        placeholder="Leírás"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <p>{error}</p>}
      <Button type="submit">Foglalás</Button>
    </form>
  );
};

export default ReservationForm;
