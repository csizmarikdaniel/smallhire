import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getProfilePicture = async (db: PrismaClient) => {
  const session = await getSession();
  const user = db.user.findUnique({
    where: { id: session?.user.id },
    select: {
      image: true,
    },
  });
  return user;
};

export default getProfilePicture;
