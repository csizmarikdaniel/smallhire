import { type ReferenceIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getReference = async (db: PrismaClient, input: ReferenceIdInput) => {
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
