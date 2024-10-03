import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";
const acceptOffer = async (
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
      status: "ACCEPTEDOFFER",
    },
  });

  await db.notification.create({
    data: {
      title: "Árajánlat elfogadva",
      description: `Az árajánlat elfogadva a(z) ${reservation.startDate.toLocaleDateString("hu-HU")} - ${reservation.endDate.toLocaleDateString("hu-HU")} időszakra`,
      reservationId: reservation.id,
      userId: reservation.workerId,
    },
  });
  return;
};

export default acceptOffer;
