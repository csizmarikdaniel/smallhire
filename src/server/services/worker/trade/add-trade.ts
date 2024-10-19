import { type AddTradeInput } from "@/types/worker";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const addTrade = async (db: PrismaClient, input: AddTradeInput) => {
  const session = await getSession();
  if (!session || session.user.role !== "WORKER") {
    throw new Error("Unauthorized");
  }

  const trades = await db.trade.findMany({
    where: {
      workerId: session.user.id,
    },
  });

  trades.forEach((trade) => {
    if (trade.name === input.name) {
      throw new Error("Ez a szakma már létezik");
    }
  });

  return db.trade.create({
    data: {
      ...input,
      workerId: session.user.id,
    },
  });
};

export default addTrade;
