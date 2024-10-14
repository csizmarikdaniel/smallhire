import { utapi } from "@/server/api/uploadthing";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const removeProfilePicture = async (db: PrismaClient) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      image: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  if (user.image) {
    await utapi.deleteFiles(user.image.url);
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      image: {
        delete: true,
      },
    },
  });

  return true;
};

export default removeProfilePicture;
