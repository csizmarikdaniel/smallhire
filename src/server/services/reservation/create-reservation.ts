import { type PrismaClient } from "@prisma/client";

const createReservation = async (
  db: PrismaClient,
  input: {
    customerId: string;
    workerId: string;
    startDate: Date;
    endDate: Date;
    description: string;
  },
) => {
  const workerReservations = await db.reservation.findMany({
    where: {
      workerId: input.workerId,
      startDate: {
        lte: input.endDate,
      },
      endDate: {
        gte: input.startDate,
      },
    },
  });
  if (workerReservations.length > 0) {
    throw new Error("Worker is already reserved in this time period");
  }

  const reservation = await db.reservation.create({
    data: {
      customerId: input.customerId,
      workerId: input.workerId,
      startDate: input.startDate,
      endDate: input.endDate,
      description: input.description,
      status: "RESERVED",
    },
  });

  return reservation;
};

export default createReservation;
