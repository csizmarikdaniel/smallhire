import { type SessionType } from "@/types";
import { type AddTradeInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const addTrade = async (
  db: PrismaClient,
  session: SessionType,
  input: AddTradeInput,
) => {
  const trades = await db.trade.findMany({
    where: {
      workerId: session?.user.id,
    },
  });

  trades.forEach((trade) => {
    if (trade.name === input.name) {
      throw new Error("Ez a szakma már létezik");
    }
  });

  return db.trade.create({
    data: {
      name: input.name,
      yearsOfExperience: input.yearsOfExperience,
      pricePerHour: input.pricePerHour,
      workerId: session?.user.id as string,
    },
  });
};

export default addTrade;
