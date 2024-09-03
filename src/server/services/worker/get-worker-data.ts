import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getWorkerData = async (db: PrismaClient) => {
  const user = await getSession();
  const worker = db.user.findUnique({ where: { email: user?.jti } });
  return worker;
};

export default getWorkerData;
