import { type PrismaClient } from "@prisma/client";

const getReferences = async (db: PrismaClient, input: { workerId: string }) => {
  const references = await db.reference.findMany({
    where: {
      workerId: input.workerId,
    },
    select: {
      id: true,
    },
  });

  return references;
};

export default getReferences;
