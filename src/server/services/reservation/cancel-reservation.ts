import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const cancelReservation = async (
  db: PrismaClient,
  input: { reservationId: string },
) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  if (session.user.role !== "CUSTOMER") {
    throw new Error("Unauthorized");
  }

  const reservation = await db.reservation.findUnique({
    where: {
      id: input.reservationId,
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  if (reservation.status !== "RESERVED") {
    throw new Error("Reservation cannot be cancelled");
  }

  const cancelledReservation = await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      status: "CANCELLED",
    },
  });

  return cancelledReservation;
};

export default cancelReservation;
