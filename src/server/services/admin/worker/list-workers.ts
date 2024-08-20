import { type PrismaClient } from "@prisma/client";

export const listWorkers = async (db: PrismaClient) => {
  const workers = await db.worker.findMany();
  return workers;
};
