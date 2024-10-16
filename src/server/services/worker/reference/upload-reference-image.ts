import { utapi } from "@/server/api/uploadthing";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const uploadReferenceImage = async (
  db: PrismaClient,
  input: { referenceId: string; images: File[] },
) => {
  const session = await getSession();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const reference = await db.reference.findUnique({
    where: {
      id: input.referenceId,
    },
    select: {
      id: true,
      workerId: true,
    },
  });

  if (!reference) {
    throw new Error("Reference not found");
  }

  for (const image of input.images) {
    if (image.type !== "image/png" && image.type !== "image/jpeg") {
      throw new Error("Invalid file type");
    }

    const response = await utapi.uploadFiles(image);
    await db.reference.update({
      where: {
        id: reference.id,
      },
      data: {
        image: {
          create: {
            url: response.data?.key ?? "",
          },
        },
      },
    });
  }

  return { success: true };
};

export default uploadReferenceImage;
