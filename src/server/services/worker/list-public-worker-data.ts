import { paginate } from "@/utils/paginate";
import { type PrismaClient } from "@prisma/client";
import { type ListWorkersInput } from "@/types/worker";

const listPublicWorkerData = async (
  db: PrismaClient,
  input: ListWorkersInput,
) => {
  const dbWorkers = await db.user.findMany({
    where: {
      name: {
        contains: input.search,
      },
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
              id: true,
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

  const filteredWorkers = dbWorkers.filter((worker) => {
    if (input.trades && input.trades.length > 0) {
      return worker.worker?.trades.some((trade) =>
        input.trades?.includes(trade.name),
      );
    }
    return true;
  });

  const earliestFreeDay = filteredWorkers.map((worker) => {
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

  const workers = filteredWorkers.map((worker, index) => {
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

  const safePage = input.page
    ? input.page < 1
      ? 1
      : input.page > Math.ceil(workers.length / (input.limit ?? 10))
        ? Math.ceil(workers.length / (input.limit ?? 10))
        : input.page
    : 1;

  if (input.sort == "asc") {
    return {
      fullListLength: workers.length,
      workers: paginate(
        workers.sort((a, b) => a.name.localeCompare(b.name)),
        { page: safePage, perPage: input.limit },
      ),
    };
  } else if (input.sort == "desc") {
    return {
      fullListLength: workers.length,
      workers: paginate(
        workers.sort((a, b) => b.name.localeCompare(a.name)),
        { page: safePage, perPage: input.limit },
      ),
    };
  } else if (input.sort == "earliest") {
    return {
      fullListLength: workers.length,
      workers: paginate(
        workers.sort(
          (a, b) => a.earliestFreeDay!.getDate() - b.earliestFreeDay!.getDate(),
        ),
        { page: safePage, perPage: input.limit },
      ),
    };
  }

  return {
    fullListLength: workers.length,
    workers: paginate(workers, { page: safePage, perPage: input.limit }),
  };
};

export default listPublicWorkerData;
