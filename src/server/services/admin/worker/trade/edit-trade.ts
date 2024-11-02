import { type EditTradeInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const editTrade = async (db: PrismaClient, input: EditTradeInput) => {
  const trade = await db.trade.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.name,
      yearsOfExperience: input.yearsOfExperience,
    },
  });

  return trade;
};

export default editTrade;
