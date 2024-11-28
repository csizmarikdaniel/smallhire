import { type SessionType } from "@/types";
import { type CreateOfferInput } from "@/types/reservation";
import { type PrismaClient } from "@prisma/client";

const createOffer = async (
  db: PrismaClient,
  session: SessionType,
  input: CreateOfferInput,
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

  if (reservation.status !== "RESERVED") {
    throw new Error("Reservation is not in the correct status");
  }

  await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      status: "CREATEDOFFER",
      price: input.price,
    },
  });

  await db.notification.create({
    data: {
      title: "Árajánlat",
      description: `Az árajánlat elkészült a(z) ${reservation.startDate.toLocaleDateString("hu-HU")} - ${reservation.endDate.toLocaleDateString("hu-HU")} időszakra`,
      reservationId: reservation.id,
      userId: reservation.customerId,
    },
  });

  return { success: true };
};

export default createOffer;
