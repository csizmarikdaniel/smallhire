import { type PrismaClient } from "@prisma/client";

const getTradeNames = async (db: PrismaClient) => {
  const trades = await db.trade.findMany({
    distinct: ["name"],
    select: {
      id: true,
      name: true,
    },
  });

  return trades;
};

export default getTradeNames;
