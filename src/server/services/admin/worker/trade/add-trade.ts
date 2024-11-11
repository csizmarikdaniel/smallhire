import { type AdminAddTradeInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const addTrade = async (db: PrismaClient, input: AdminAddTradeInput) => {
  const trade = await db.trade.findFirst({
    where: {
      workerId: input.workerId,
      name: input.name,
    },
  });

  if (trade) {
    throw new Error("Ez a szakma már létezik");
  }

  return db.trade.create({
    data: {
      name: input.name,
      yearsOfExperience: input.yearsOfExperience,
      workerId: input.workerId,
      pricePerHour: input.pricePerHour,
    },
  });
};

export default addTrade;
