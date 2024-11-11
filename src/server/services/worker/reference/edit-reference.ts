import { type SessionType } from "@/types";
import { type EditReferenceInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const editReference = async (
  db: PrismaClient,
  session: SessionType,
  input: EditReferenceInput,
) => {
  const reference = await db.reference.findUnique({
    where: {
      id: input.referenceId,
    },
  });

  if (!reference) {
    throw new Error("Nem található a referencia");
  }

  if (reference.workerId !== session?.user.id) {
    throw new Error("Nem található a referencia");
  }

  await db.reference.update({
    where: {
      id: input.referenceId,
    },
    data: {
      description: input.description,
    },
  });

  return { success: true };
};

export default editReference;
