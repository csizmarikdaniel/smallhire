import { type ReservationIdInput, type SessionType } from "@/types";
import { type PrismaClient } from "@prisma/client";

const completeReservation = async (
  db: PrismaClient,
  session: SessionType,
  input: ReservationIdInput,
) => {
  if (session?.user.role !== "WORKER") {
    throw new Error("Unauthorized");
  }

  const reservation = await db.reservation.findFirst({
    where: {
      id: input.reservationId,
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  if (reservation.status !== "ACCEPTEDOFFER") {
    throw new Error("Reservation is not in the correct status");
  }

  await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      status: "COMPLETED",
    },
  });

  return;
};

export default completeReservation;
