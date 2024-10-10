import { type PrismaClient } from "@prisma/client";

const getNumberOfPages = async (
  db: PrismaClient,
  input: { pageSize?: number; search?: string; trades?: string[] },
) => {
  const dbWorkers = await db.user.findMany({
    where: {
      name: {
        contains: input.search,
      },
      role: "WORKER",
    },
    include: {
      worker: {
        include: {
          trades: true,
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
  return Math.ceil(filteredWorkers.length / (input.pageSize ?? 10));
};

export default getNumberOfPages;
