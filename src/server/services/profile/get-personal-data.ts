import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getPersonalData = async (db: PrismaClient) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = db.user.findUnique({ where: { id: session?.user.id } });
  return user;
};

export default getPersonalData;
