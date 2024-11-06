import { type SessionType } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getAdmin = async (db: PrismaClient, session: SessionType) => {
  const admin = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Admin not found");
  }

  return admin;
};

export default getAdmin;
