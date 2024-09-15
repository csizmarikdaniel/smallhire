import { type PrismaClient } from "@prisma/client";

const getWorkerReservations = async (db: PrismaClient, workerId: string) => {
  const reservations = await db.reservation.findMany({
    where: {
      workerId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
    },
  });
  return reservations;
};

export default getWorkerReservations;
