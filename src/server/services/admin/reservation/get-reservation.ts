import { type ReservationIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getReservation = async (db: PrismaClient, input: ReservationIdInput) => {
  return db.reservation.findUnique({
    where: {
      id: input.reservationId,
    },
    select: {
      id: true,
      customer: {
        include: { user: true },
      },
      description: true,
      status: true,
      startDate: true,
      endDate: true,
      images: true,
      price: true,
      worker: {
        include: { user: true },
      },
    },
  });
};

export default getReservation;
