import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const rejectReservation = async (
  db: PrismaClient,
  input: { reservationId: string },
) => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "WORKER") {
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

  if (reservation.status !== "RESERVED") {
    throw new Error("Reservation is not in the correct status");
  }

  await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      status: "REJECTED",
    },
  });

  await db.notification.create({
    data: {
      title: "Foglalás elutasítva",
      description: `A foglalás el lett utasítva a(z) ${reservation.startDate.toLocaleDateString("hu-HU")} - ${reservation.endDate.toLocaleDateString("hu-HU")} időszakra a munkavállaló által`,
      reservationId: reservation.id,
      userId: reservation.customerId,
    },
  });

  return;
};

export default rejectReservation;
