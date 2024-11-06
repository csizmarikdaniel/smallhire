import { type WorkerIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getWorkerTradeIds = async (db: PrismaClient, input: WorkerIdInput) => {
  const worker = await db.user.findUnique({
    where: {
      id: input.workerId,
      role: "WORKER",
    },
  });

  if (!worker) {
    throw new Error("Worker not found");
  }

  const trades = await db.trade.findMany({
    where: {
      workerId: input.workerId,
    },
    select: {
      id: true,
    },
  });

  return trades;
};

export default getWorkerTradeIds;
