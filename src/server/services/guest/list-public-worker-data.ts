import { type PrismaClient } from "@prisma/client";

const listPublicWorkerData = async (db: PrismaClient) => {
  const workers = await db.user.findMany({
    where: {
      role: "WORKER",
    },
    select: {
      id: true,
      name: true,
      address: true,
      city: true,
      zipCode: true,
      worker: {
        select: {
          trades: {
            select: {
              name: true,
              yearsOfExperience: true,
            },
          },
          reservations: {
            select: {
              startDate: true,
              endDate: true,
            },
          },
        },
      },
    },
  });

  const earliestFreeDay = workers.map((worker) => {
    const reservations = worker.worker?.reservations;
    const reservedDaysMap = reservations?.reduce((acc, reservation) => {
      const start = reservation.startDate;
      const end = reservation.endDate;
      const days = [];
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        if (new Date() < date) days.push(new Date(date));
      }
      return [...acc, ...days];
    }, [] as Date[]);
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
    const sorted =
      reservedDaysMap?.sort(
        (a, b) =>
          new Date(a).setHours(0, 0, 0, 0) - new Date(b).setHours(0, 0, 0, 0),
      ) ?? [];
    if (sorted?.length == 0 || sorted[0]?.getDate() !== tomorrow.getDate()) {
      return tomorrow;
    } else {
      let previous = new Date();
      for (const date of sorted) {
        if (previous.getDate() - date.getDate() > 1) {
          return new Date(previous.setDate(previous.getDate() + 1));
        }
        previous = date;
      }
      return new Date(previous.setDate(previous.getDate() + 1));
    }
  });

  return workers.map((worker, index) => {
    return {
      id: worker.id,
      name: worker.name,
      address: worker.address,
      city: worker.city,
      zipCode: worker.zipCode,
      trades: worker.worker?.trades,
      earliestFreeDay: earliestFreeDay[index],
    };
  });
};

export default listPublicWorkerData;
