import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getTrades = async (db: PrismaClient) => {
  const session = await getSession();
  const trades = db.trade.findMany({
    where: { workerId: session?.user.id },
    select: { name: true, yearsOfExperience: true },
  });
  return trades;
};

export default getTrades;
