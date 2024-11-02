import { type AdminAddTradeInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const addTrade = async (db: PrismaClient, input: AdminAddTradeInput) => {
  return db.trade.create({
    data: {
      name: input.name,
      yearsOfExperience: input.yearsOfExperience,
      workerId: input.workerId,
    },
  });
};

export default addTrade;
