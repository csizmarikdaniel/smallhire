import { type DeleteTradeInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const deleteTrade = async (db: PrismaClient, input: DeleteTradeInput) => {
  const trade = await db.trade.delete({
    where: { id: input.id },
  });
  return trade;
};

export default deleteTrade;
