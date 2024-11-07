import { type WorkerIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getPublicWorkerData = async (db: PrismaClient, input: WorkerIdInput) => {
  const worker = await db.user.findFirst({
    where: {
      id: input.workerId,
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
          references: {
            select: {
              id: true,
              image: true,
              description: true,
            },
          },
        },
      },
    },
  });
  if (!worker) {
    throw new Error(`Worker with id ${input.workerId} not found`);
  }
  return worker;
};

export default getPublicWorkerData;
