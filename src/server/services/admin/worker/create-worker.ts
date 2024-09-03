import type { CreateWorkerInput } from "@/types/worker";
import type { PrismaClient } from "@prisma/client";

export const createWorker = async (
  prisma: PrismaClient,
  input: CreateWorkerInput,
) => {
  const worker = await prisma.worker.create({
    data: {
      user: {
        create: {
          name: input.name,
          email: input.email,
          password: input.password,
          role: "WORKER",
          address: input.address,
          city: input.city,
          zipCode: input.zipCode,
        },
      },
    },
  });
  return worker;
};
