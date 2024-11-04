import { utapi } from "@/server/api/uploadthing";
import { type PrismaClient } from "@prisma/client";

const addReferenceImage = async (
  db: PrismaClient,
  input: { referenceId: string; images: File[] | File | null },
) => {
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
                userId: reference.workerId,
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
              userId: reference.workerId,
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

export default addReferenceImage;
