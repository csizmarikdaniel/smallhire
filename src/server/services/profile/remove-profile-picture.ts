import { utapi } from "@/server/api/uploadthing";
import { type SessionType } from "@/types";
import { type PrismaClient } from "@prisma/client";

const removeProfilePicture = async (db: PrismaClient, session: SessionType) => {
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      images: {
        where: {
          profileImage: true,
        },
      },
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  if (user.images && user.images.length > 0 && user.images[0]) {
    await utapi.deleteFiles(user.images[0].url);
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      images: {
        delete: {
          id: user.images[0]?.id,
        },
      },
    },
  });

  return true;
};

export default removeProfilePicture;
