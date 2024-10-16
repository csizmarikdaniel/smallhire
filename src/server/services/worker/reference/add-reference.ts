import { utapi } from "@/server/api/uploadthing";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const addReference = async (
  db: PrismaClient,
  input: { description: string; images: File[] },
) => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "WORKER") {
    throw new Error("User is not a worker");
  }

  const reference = await db.reference.create({
    data: {
      workerId: user.id,
      description: input.description,
    },
  });

  for (const image of input.images) {
    if (image.type !== "image/png" && image.type !== "image/jpeg") {
      throw new Error("Invalid file type");
    }
    const response = await utapi.uploadFiles(image);

    const dbImage = await db.image.create({
      data: {
        url: response.data?.key ?? "",
        referenceId: reference.id,
      },
    });

    await db.reference.update({
      where: {
        id: reference.id,
      },
      data: {
        image: {
          connect: {
            id: dbImage.id,
          },
        },
      },
    });
  }

  return { success: true };
};

export default addReference;
