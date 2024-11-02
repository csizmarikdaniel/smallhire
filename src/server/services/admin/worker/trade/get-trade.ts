import { type PrismaClient } from "@prisma/client";

const getTrade = async (db: PrismaClient, input: { tradeId: string }) => {
  const trade = await db.trade.findUnique({
    where: {
      id: input.tradeId,
    },
  });

  return trade;
};

export default getTrade;
