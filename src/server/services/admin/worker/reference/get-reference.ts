import { type PrismaClient } from "@prisma/client";

const getReference = async (
  db: PrismaClient,
  input: { referenceId: string },
) => {
  const reference = await db.reference.findUnique({
    where: {
      id: input.referenceId,
    },
    include: {
      image: true,
    },
  });

  return reference;
};

export default getReference;
