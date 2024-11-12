"use client";

import { useState } from "react";
import ReservationStatusTag from "../../profile/reservation-status-tag";
import Button from "../../button";
import { api } from "@/trpc/react";

const ReservationStatuses = [
  { value: "RESERVED", text: "Foglalva" },
  { value: "CANCELLED", text: "Lemondva" },
  { value: "REJECTED", text: "Elutasítva" },
  { value: "CREATEDOFFER", text: "Ajánlatot tett" },
  { value: "ACCEPTEDOFFER", text: "Ajánlat elfogadva" },
  { value: "REJECTEDOFFER", text: "Ajánlat elutasítva" },
  { value: "COMPLETED", text: "Befejezve" },
];

type ReservationStatusProps = {
  status: string;
  reservationId: string;
};

const ReservationStatus = ({
  status,
  reservationId,
}: ReservationStatusProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const editStatus = api.admin.reservation.editStatus.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  const onEdit = (status: string) => {
    editStatus.mutate({ reservationId, status });
    setIsEditing(false);
  };
  return (
    <div className="rounded-lg bg-white p-5">
      <h2 className="text-2xl">Státusz</h2>
      {isEditing ? (
        <div>
          <div className="flex flex-wrap">
            {ReservationStatuses.map((s) => (
              <Button
                className={`${s.value === status ? "bg-sky-400" : ""}`}
                onClick={() => onEdit(s.value)}
                key={s.value}
              >
                {s.text}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <ReservationStatusTag status={status} />
          <Button
            className="mt-3"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Szerkesztés
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReservationStatus;
