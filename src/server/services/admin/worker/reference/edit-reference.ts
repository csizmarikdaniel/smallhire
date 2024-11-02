import { type EditReferenceInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const editReference = async (db: PrismaClient, input: EditReferenceInput) => {
  const reference = await db.reference.findUnique({
    where: {
      id: input.id,
    },
  });

  if (!reference) {
    throw new Error("Reference not found");
  }

  return db.reference.update({
    where: {
      id: input.id,
    },
    data: {
      description: input.description,
    },
  });
};

export default editReference;
