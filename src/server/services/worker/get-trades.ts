import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getTrades = async (db: PrismaClient, input?: { id: string }) => {
  const session = await getSession();
  const trades = db.trade.findMany({
    where: { workerId: input ? input.id : session?.user.id },
    select: { name: true, yearsOfExperience: true, id: true },
  });
  return trades;
};

export default getTrades;
