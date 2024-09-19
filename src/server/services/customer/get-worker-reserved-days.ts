import { type PrismaClient } from "@prisma/client";

const getWorkerReservedDays = async (db: PrismaClient, workerId: string) => {
  const reservations = await db.reservation.findMany({
    where: {
      AND: [
        {
          workerId,
        },
        {
          OR: [
            {
              status: "RESERVED",
            },
            {
              status: "CREATEDOFFER",
            },
            {
              status: "ACCEPTEDOFFER",
            },
            {
              status: "COMPLETED",
            },
          ],
        },
      ],
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
    },
  });
  return reservations;
};

export default getWorkerReservedDays;
