import { type PrismaClient } from "@prisma/client";

const deleteTrade = async (db: PrismaClient, input: { tradeId: string }) => {
  const trade = await db.trade.delete({
    where: {
      id: input.tradeId,
    },
  });

  return trade;
};

export default deleteTrade;
