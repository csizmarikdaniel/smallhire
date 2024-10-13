import { utapi } from "@/server/api/uploadthing";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const uploadReferenceImage = async (db: PrismaClient, input: File) => {
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

  const response = await utapi.uploadFiles(input);
  await db.reference.update({
    where: {
      id: session.user.id,
    },
    data: {
      image: {
        create: {
          url: response.data?.key ?? "",
        },
      },
    },
  });
};

export default uploadReferenceImage;
