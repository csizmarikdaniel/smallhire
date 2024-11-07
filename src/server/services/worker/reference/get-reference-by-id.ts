import { type ReferenceIdInput, type SessionType } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getReferenceById = async (
  db: PrismaClient,
  session: SessionType,
  input: ReferenceIdInput,
) => {
  if (session?.user.role !== "WORKER") {
    throw new Error("Unauthorized");
  }
  const reference = await db.reference.findUnique({
    where: {
      id: input.referenceId,
    },
    select: {
      id: true,
      description: true,
      image: true,
      workerId: true,
    },
  });

  if (!reference) {
    throw new Error("Reference not found");
  }

  if (reference.workerId !== session?.user.id) {
    throw new Error("Unauthorized");
  }

  return reference;
};

export default getReferenceById;
