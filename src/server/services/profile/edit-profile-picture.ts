import { utapi } from "@/server/api/uploadthing";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const editProfilePicture = async (db: PrismaClient, input: File) => {
  const session = await getSession();

  if (!session) {
    throw new Error("User not authenticated");
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

  if (user.image?.url) {
    await utapi.deleteFiles(user.image.url);
  }

  if (input.type !== "image/png" && input.type !== "image/jpeg") {
    throw new Error("Invalid file type");
  }

  const response = await utapi.uploadFiles(input);
  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      image: {
        create: {
          url: response.data?.key ?? "",
        },
      },
    },
  });
};

export default editProfilePicture;
