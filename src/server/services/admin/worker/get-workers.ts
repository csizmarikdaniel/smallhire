import { type AdminListWorkersInput } from "@/types/admin";
import { paginate } from "@/utils/paginate";
import { type PrismaClient } from "@prisma/client";

const getWorkers = async (db: PrismaClient, input: AdminListWorkersInput) => {
  const workers = await db.user.findMany({
    where: {
      role: "WORKER",
      name: {
        contains: input.search,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
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
        },
      },
    },
  });

  const filteredWorkers = workers.filter((worker) => {
    if (input.trades && input.trades.length > 0) {
      return worker.worker?.trades.some((trade) =>
        input.trades?.includes(trade.name),
      );
    }
    return true;
  });

  return {
    fullListLength: filteredWorkers.length,
    workers: paginate(filteredWorkers, {
      page: input.page,
      perPage: input.limit,
    }),
  };
};

export default getWorkers;
