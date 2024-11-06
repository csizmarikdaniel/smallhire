import { utapi } from "@/server/api/uploadthing";
import { type ReferenceIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const deleteReference = async (db: PrismaClient, input: ReferenceIdInput) => {
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

  if (reference.image) {
    await utapi.deleteFiles(reference.image.map((image) => image.url));
    await db.image.deleteMany({
      where: {
        id: {
          in: reference.image.map((image) => image.id),
        },
      },
    });
  }

  await db.reference.delete({
    where: {
      id: input.referenceId,
    },
  });

  return reference;
};

export default deleteReference;
