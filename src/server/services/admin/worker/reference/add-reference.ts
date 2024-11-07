import { utapi } from "@/server/api/uploadthing";
import { type AdminAddReferenceInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const addReference = async (
  db: PrismaClient,
  input: AdminAddReferenceInput,
) => {
  const worker = await db.worker.findUnique({
    where: {
      userId: input.workerId,
    },
  });

  if (!worker) {
    throw new Error("Worker not found");
  }

  const reference = await db.reference.create({
    data: {
      description: input.formData.description,
      workerId: input.workerId,
    },
  });

  if (input.formData.images) {
    if (Array.isArray(input.formData.images)) {
      for (const image of input.formData.images) {
        if (image.type !== "image/png" && image.type !== "image/jpeg") {
          throw new Error("Invalid file type");
        }
      }
      const response = await utapi.uploadFiles(input.formData.images);
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
        input.formData.images.type !== "image/png" &&
        input.formData.images.type !== "image/jpeg"
      ) {
        throw new Error("Invalid file type");
      }
      const response = await utapi.uploadFiles(input.formData.images);
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

  return reference;
};

export default addReference;
