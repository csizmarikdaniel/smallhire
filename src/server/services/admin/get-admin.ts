import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getAdmin = async (db: PrismaClient) => {
  const session = await getSession();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const admin = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Admin not found");
  }

  return admin;
};

export default getAdmin;
