import { type IdInput } from "@/types/guest";
import { type PrismaClient } from "@prisma/client";

const getTrade = async (db: PrismaClient, input: IdInput) => {
  const trade = await db.trade.findUnique({ where: { id: input.id } });
  return trade;
};

export default getTrade;
