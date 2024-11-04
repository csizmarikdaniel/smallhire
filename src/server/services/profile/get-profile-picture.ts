import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getProfilePicture = async (db: PrismaClient) => {
  const session = await getSession();
  const image = await db.image.findFirst({
    where: {
      userId: session?.user.id,
      profileImage: true,
    },
  });
  return image;
};

export default getProfilePicture;
