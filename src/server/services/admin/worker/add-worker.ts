import { type AddWorkerInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const addWorker = async (db: PrismaClient, input: AddWorkerInput) => {
  const dbWorker = await db.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (dbWorker) {
    throw new Error("User already exists");
  }

  const worker = await db.user.create({
    data: {
      ...input,
      role: "WORKER",
    },
  });

  await db.worker.create({
    data: {
      userId: worker.id,
    },
  });

  return worker;
};

export default addWorker;
