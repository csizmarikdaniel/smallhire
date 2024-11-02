import { utapi } from "@/server/api/uploadthing";
import { type PrismaClient } from "@prisma/client";

const deleteReferenceImage = async (
  db: PrismaClient,
  input: { referenceId: string; imageId: string },
) => {
  const reference = await db.reference.findUnique({
    where: {
      id: input.referenceId,
    },
  });

  if (!reference) {
    throw new Error("Reference not found");
  }

  const image = await db.image.findUnique({
    where: {
      id: input.imageId,
    },
  });

  if (!image) {
    throw new Error("Image not found");
  }

  if (image.referenceId !== reference.id) {
    throw new Error("Image does not belong to reference");
  }

  await utapi.deleteFiles(image.url);
  await db.image.delete({
    where: {
      id: input.imageId,
    },
  });

  return reference;
};

export default deleteReferenceImage;
