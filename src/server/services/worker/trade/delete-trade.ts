import { type TradeIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const deleteTrade = async (db: PrismaClient, input: TradeIdInput) => {
  await db.trade.delete({
    where: { id: input.tradeId },
  });
  return { success: true };
};

export default deleteTrade;
