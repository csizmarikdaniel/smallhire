import { utapi } from "@/server/api/uploadthing";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const editProfilePicture = async (db: PrismaClient, input: File) => {
  const session = await getSession();

  if (!session) {
    throw new Error("User not authenticated");
  }

  console.log("server", input);
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  if (user.image) {
    await utapi.deleteFiles(user.image);
  }

  const response = await utapi.uploadFiles(input);
  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      image: response.data?.key,
    },
  });
};

export default editProfilePicture;
