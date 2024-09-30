import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getPersonalData = async (db: PrismaClient) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = db.user.findUnique({
    where: { id: session?.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      city: true,
      phone: true,
      zipCode: true,
    },
  });
  return user;
};

export default getPersonalData;
