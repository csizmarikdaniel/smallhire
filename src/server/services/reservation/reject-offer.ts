import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const rejectOffer = async (
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

  const reservation = await db.reservation.findFirst({
    where: {
      id: input.reservationId,
    },
  });
  if (!reservation) {
    throw new Error("Reservation not found");
  }

  if (reservation.status !== "CREATEDOFFER") {
    throw new Error("Reservation is not in the correct status");
  }

  await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      status: "REJECTEDOFFER",
    },
  });

  await db.notification.create({
    data: {
      title: "Árajánlat elutasítva",
      description: `Az árajánlat el lett utasítva a(z) ${reservation.startDate.toLocaleDateString("hu-HU")} - ${reservation.endDate.toLocaleDateString("hu-HU")} időszakra a megrendelő által`,
      reservationId: reservation.id,
      userId: reservation.workerId,
    },
  });
  return;
};

export default rejectOffer;
