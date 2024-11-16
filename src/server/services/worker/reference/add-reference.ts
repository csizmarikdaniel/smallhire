import { utapi } from "@/server/api/uploadthing";
import { type SessionType } from "@/types";
import { type AddReferenceInput } from "@/types/worker";
import { type PrismaClient } from "@prisma/client";

const addReference = async (
  db: PrismaClient,
  session: SessionType,
  input: AddReferenceInput,
) => {
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
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
      if (input.images.size !== 0) {
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
    }
  } else {
    throw new Error("No images provided");
  }

  return { success: true };
};

export default addReference;
