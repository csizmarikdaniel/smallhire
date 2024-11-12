"use client";

import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import Button from "../../button";
import { api } from "@/trpc/react";
import "react-day-picker/style.css";

type ReservationDatesProps = {
  startDate?: Date;
  endDate?: Date;
  reservationId: string;
  workerId: string;
};

const ReservationDates = ({
  startDate,
  endDate,
  reservationId,
  workerId,
}: ReservationDatesProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [selectedDays, setSelectedDays] = useState<DateRange>({
    from: startDate,
    to: endDate,
  });
  const reservedDays = api.customer.worker.reservedDays.useQuery({
    workerId,
  });

  const editDates = api.admin.reservation.editDates.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSave = () => {
    if (selectedDays?.from === undefined) {
      setError("Válassz időpontot");
    } else {
      editDates.mutate({
        reservationId,
        startDate: selectedDays.from,
        endDate: selectedDays.to ?? selectedDays.from,
      });
      if (!error) {
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="rounded-lg bg-white p-5">
      {isEditing ? (
        startDate &&
        endDate && (
          <div>
            <DayPicker
              mode="range"
              selected={selectedDays}
              onSelect={setSelectedDays}
              required={true}
              disabled={{ before: new Date() }}
              modifiers={{
                booked: reservedDays.data,
              }}
              modifiersClassNames={{
                disabled: "text-gray-400",
                booked: "line-through",
              }}
              onDayClick={(_, modifiers) => {
                if (modifiers.booked) {
                  alert("Ez a nap már le van foglalva");
                  setSelectedDays({ from: undefined, to: undefined });
                }
              }}
            />
            <Button onClick={onSave}>Mentés</Button>
            <Button onClick={() => setIsEditing(false)}>Mégse</Button>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Időpontok</h2>
          <p className="text-center">
            {startDate?.toLocaleDateString("hu-HU")} -{" "}
            {endDate?.toLocaleDateString("hu-HU")}
          </p>
          <Button onClick={() => setIsEditing(true)}>Szerkesztés</Button>
        </div>
      )}
    </div>
  );
};

export default ReservationDates;
