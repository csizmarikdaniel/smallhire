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

  const reservedDaysMap = reservations.reduce((acc, reservation) => {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    const days = [];
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date));
    }
    return [...acc, ...days];
  }, [] as Date[]);

  return reservedDaysMap;
};

export default getWorkerReservedDays;
