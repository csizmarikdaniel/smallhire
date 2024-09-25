import { utapi } from "@/server/api/uploadthing";
import { type PrismaClient } from "@prisma/client";

const upload = async (db: PrismaClient, input: File) => {
  //const response = await utapi.uploadFiles(input);

  console.log(input);
};

export default upload;
