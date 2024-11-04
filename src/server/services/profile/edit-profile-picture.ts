import { utapi } from "@/server/api/uploadthing";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const editProfilePicture = async (db: PrismaClient, input: File) => {
  const session = await getSession();

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

  if (user.images.length > 0) {
    if (user.images[0]?.userId !== session?.user.id) {
      throw new Error("Image does not belong to user");
    }

    if (user.images[0]?.url) {
      await utapi.deleteFiles(user.images[0].url);
    }

    await db.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        images: {
          delete: {
            id: user.images[0]?.id,
          },
        },
      },
    });
  }

  if (input.type !== "image/png" && input.type !== "image/jpeg") {
    throw new Error("Invalid file type");
  }

  const response = await utapi.uploadFiles(input);
  await db.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      images: {
        create: {
          url: response.data?.key ?? "",
          profileImage: true,
        },
      },
    },
  });
};

export default editProfilePicture;
