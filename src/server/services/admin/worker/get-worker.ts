import { type IdInput } from "@/types/guest";
import { type PrismaClient } from "@prisma/client";

const getWorker = async (db: PrismaClient, input: IdInput) => {
  const worker = await db.user.findFirst({
    where: {
      id: input.id,
      role: "WORKER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      zipCode: true,
      image: true,
    },
  });
  if (!worker) {
    throw new Error(`Worker with id ${input.id} not found`);
  }
  return worker;
};

export default getWorker;
