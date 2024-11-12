import { type PrismaClient } from "@prisma/client";

const getReservations = async (db: PrismaClient) => {
  const reservations = await db.reservation.findMany({
    include: {
      customer: {
        include: {
          user: true,
        },
      },
      worker: {
        include: {
          user: true,
        },
      },
    },
  });
  return reservations.map((reservation) => ({
    id: reservation.id,
    customer: reservation.customer.user.name,
    worker: reservation.worker.user.name,
    status: reservation.status,
    startDate: reservation.startDate,
    endDate: reservation.endDate,
  }));
};

export default getReservations;
