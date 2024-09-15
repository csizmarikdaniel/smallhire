import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const createOffer = async (
  db: PrismaClient,
  input: { reservationId: string; price: number },
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
      status: "CREATEDOFFER",
      price: input.price,
    },
  });

  return;
};

export default createOffer;
