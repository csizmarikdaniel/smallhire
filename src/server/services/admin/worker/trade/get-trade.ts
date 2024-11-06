import { type TradeIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getTrade = async (db: PrismaClient, input: TradeIdInput) => {
  const trade = await db.trade.findUnique({
    where: {
      id: input.tradeId,
    },
  });

  return trade;
};

export default getTrade;
