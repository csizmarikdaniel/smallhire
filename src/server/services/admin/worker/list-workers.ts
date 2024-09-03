import { type PrismaClient } from "@prisma/client";

export const listWorkers = async (db: PrismaClient) => {
  const workers = await db.user.findMany({
    where: {
      role: "WORKER",
    },
    include: {
      worker: true,
    },
  });
  return workers;
};
