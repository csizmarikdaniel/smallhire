import { type EditTradeInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const editTrade = async (db: PrismaClient, input: EditTradeInput) => {
  const trade = db.trade.update({
    where: { id: input.id },
    data: {
      name: input.name,
      yearsOfExperience: input.yearsOfExperience,
      pricePerHour: input.pricePerHour,
    },
  });
  return trade;
};

export default editTrade;
