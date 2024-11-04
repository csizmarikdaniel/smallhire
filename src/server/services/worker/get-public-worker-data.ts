import { type IdInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const getPublicWorkerData = async (db: PrismaClient, input: IdInput) => {
  const worker = await db.user.findFirst({
    where: {
      id: input.id,
      role: "WORKER",
    },
    select: {
      id: true,
      name: true,
      address: true,
      city: true,
      zipCode: true,
      images: {
        where: {
          profileImage: true,
        },
      },
      worker: {
        select: {
          trades: {
            select: {
              id: true,
              name: true,
              yearsOfExperience: true,
              pricePerHour: true,
            },
          },
        },
      },
    },
  });
  if (!worker) {
    throw new Error(`Worker with id ${input.id} not found`);
  }
  return worker;
};

export default getPublicWorkerData;
