import { type TradeIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const deleteTrade = async (db: PrismaClient, input: TradeIdInput) => {
  const trade = await db.trade.delete({
    where: {
      id: input.tradeId,
    },
  });

  return trade;
};

export default deleteTrade;
