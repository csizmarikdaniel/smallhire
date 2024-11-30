import { utapi } from "@/server/api/uploadthing";
import { type SessionType } from "@/types";
import { type EditProfilePictureInput } from "@/types/profile";
import { type PrismaClient } from "@prisma/client";

const editProfilePicture = async (
  db: PrismaClient,
  session: SessionType,
  input: EditProfilePictureInput,
) => {
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

  if (input.image.type !== "image/png" && input.image.type !== "image/jpeg") {
    throw new Error("Invalid file type");
  }

  const response = await utapi.uploadFiles(input.image);
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

  return {
    success: true,
  };
};

export default editProfilePicture;
