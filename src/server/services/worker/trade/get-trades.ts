import { type SessionType } from "@/types";
import { type ListTradesInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const getTrades = async (
  db: PrismaClient,
  session: SessionType,
  input: ListTradesInput,
) => {
  const trades = await db.trade.findMany({
    where: { workerId: input ? input.id : session?.user.id },
    select: {
      name: true,
      yearsOfExperience: true,
      id: true,
      pricePerHour: true,
    },
  });
  return trades;
};

export default getTrades;
