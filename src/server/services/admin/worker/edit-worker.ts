import type { EditWorkerInput } from "@/types/worker";
import type { PrismaClient } from "@prisma/client";

export const editWorker = async (db: PrismaClient, input: EditWorkerInput) => {
  const worker = await db.worker.update({
    where: { userId: input.id },
    data: {
      user: {
        update: {
          name: input.name,
          email: input.email,
        },
      },
    },
  });
  return worker;
};
