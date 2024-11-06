import { type SessionType } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getPersonalData = async (db: PrismaClient, session: SessionType) => {
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
