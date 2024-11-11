import { utapi } from "@/server/api/uploadthing";
import { type ReferenceIdInput, type SessionType } from "@/types";
import { type PrismaClient } from "@prisma/client";

const removeReference = async (
  db: PrismaClient,
  session: SessionType,
  input: ReferenceIdInput,
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
    throw new Error("Nem található a referencia");
  }

  if (reference.workerId !== session?.user.id) {
    throw new Error("Nem található a referencia");
  }

  if (reference.image) {
    await utapi.deleteFiles(reference.image.map((image) => image.url));
    await db.image.deleteMany({
      where: {
        referenceId: input.referenceId,
      },
    });
  }

  await db.reference.delete({
    where: {
      id: input.referenceId,
    },
  });
};

export default removeReference;
