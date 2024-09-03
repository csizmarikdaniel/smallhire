import { type IdInput } from "@/types/guest";
import { type PrismaClient } from "@prisma/client";

const getPublicWorkerData = async (db: PrismaClient, { id }: IdInput) => {
  const worker = await db.user.findFirst({
    where: {
      id,
      role: "WORKER",
    },
    select: {
      id: true,
      name: true,
      address: true,
      city: true,
      zipCode: true,
      image: true,
      worker: {
        select: {
          trades: {
            select: {
              name: true,
              yearsOfExperience: true,
            },
          },
        },
      },
    },
  });
  if (!worker) {
    throw new Error(`Worker with id ${id} not found`);
  }
  return worker;
};

export default getPublicWorkerData;
