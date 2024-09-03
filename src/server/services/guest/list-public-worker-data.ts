import { type PrismaClient } from "@prisma/client";

const listPublicWorkerData = async (db: PrismaClient) => {
  const workers = db.user.findMany({
    where: {
      role: "WORKER",
    },
    select: {
      id: true,
      name: true,
      address: true,
      city: true,
      zipCode: true,
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
  return workers;
};

export default listPublicWorkerData;
