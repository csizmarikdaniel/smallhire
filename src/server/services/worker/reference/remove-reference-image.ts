import { utapi } from "@/server/api/uploadthing";
import { type SessionType } from "@/types";
import { type DeleteReferenceImageInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const removeReferenceImage = async (
  db: PrismaClient,
  session: SessionType,
  input: DeleteReferenceImageInput,
) => {
  const reference = await db.reference.findUnique({
    where: {
      id: input.referenceId,
    },
    include: {
      image: true,
    },
  });

  if (!reference) {
    throw new Error("Reference not found");
  }

  if (reference.workerId !== session?.user.id) {
    throw new Error("Unauthorized");
  }

  if (!reference.image) {
    throw new Error("Image not found");
  }

  const image = await db.image.findUnique({
    where: {
      id: input.imageId,
    },
  });

  if (!image) {
    throw new Error("Image not found");
  }

  if (!reference.image.some((img) => img.id === image.id)) {
    throw new Error("Image not found in reference");
  }

  await utapi.deleteFiles(image.url);

  await db.image.delete({
    where: {
      id: image.id,
    },
  });

  await db.reference.update({
    where: {
      id: reference.id,
    },
    data: {
      image: {
        disconnect: {
          id: image.id,
        },
      },
    },
  });

  return true;
};

export default removeReferenceImage;
