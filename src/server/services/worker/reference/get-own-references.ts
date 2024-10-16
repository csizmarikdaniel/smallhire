import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getOwnReferences = async (db: PrismaClient) => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const references = await db.reference.findMany({
    where: {
      workerId: session.user.id,
    },
    select: {
      id: true,
    },
  });
  return references;
};

export default getOwnReferences;
