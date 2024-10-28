import { utapi } from "@/server/api/uploadthing";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const uploadReferenceImage = async (
  db: PrismaClient,
  input: { referenceId: string; images: File[] | File | null },
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
  if (input.images) {
    if (Array.isArray(input.images)) {
      for (const image of input.images) {
        if (image.type !== "image/png" && image.type !== "image/jpeg") {
          throw new Error("Invalid file type");
        }
      }
      const response = await utapi.uploadFiles(input.images);
      for (const file of response) {
        await db.reference.update({
          where: {
            id: reference.id,
          },
          data: {
            image: {
              create: {
                url: file.data?.key ?? "",
              },
            },
          },
        });
      }
    } else {
      if (
        input.images.type !== "image/png" &&
        input.images.type !== "image/jpeg"
      ) {
        throw new Error("Invalid file type");
      }
      const response = await utapi.uploadFiles(input.images);
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
  } else {
    throw new Error("No images provided");
  }

  return { success: true };
};

export default uploadReferenceImage;
