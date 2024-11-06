import { type SessionType } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getProfilePicture = async (db: PrismaClient, session: SessionType) => {
  const image = await db.image.findFirst({
    where: {
      userId: session?.user.id,
      profileImage: true,
    },
  });
  return image;
};

export default getProfilePicture;
