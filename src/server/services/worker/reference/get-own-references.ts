import { type SessionType } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getOwnReferences = async (db: PrismaClient, session: SessionType) => {
  if (session?.user.role !== "WORKER") {
    throw new Error("Not authorized");
  }

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const references = await db.reference.findMany({
    where: {
      workerId: session?.user.id,
    },
    select: {
      id: true,
    },
  });
  return references;
};

export default getOwnReferences;
