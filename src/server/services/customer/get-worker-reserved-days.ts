import { type WorkerIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getWorkerReservedDays = async (
  db: PrismaClient,
  input: WorkerIdInput,
) => {
  const reservations = await db.reservation.findMany({
    where: {
      AND: [
        {
          workerId: input.workerId,
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
