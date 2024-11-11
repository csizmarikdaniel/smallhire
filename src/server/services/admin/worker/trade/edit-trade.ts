import { type EditTradeInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const editTrade = async (db: PrismaClient, input: EditTradeInput) => {
  const trade = await db.trade.findFirst({
    where: {
      workerId: input.workerId,
      name: input.name,
    },
  });

  if (trade && trade.id !== input.id) {
    throw new Error("Ez a szakma már létezik");
  }

  return await db.trade.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.name,
      yearsOfExperience: input.yearsOfExperience,
      pricePerHour: input.pricePerHour,
    },
  });
};

export default editTrade;
