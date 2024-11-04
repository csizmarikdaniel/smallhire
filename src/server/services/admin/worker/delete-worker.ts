import { utapi } from "@/server/api/uploadthing";
import { type PrismaClient } from "@prisma/client";

const deleteWorker = async (db: PrismaClient, input: { workerId: string }) => {
  const reservations = await db.reservation.findMany({
    where: {
      workerId: input.workerId,
    },
  });

  if (reservations.length > 0) {
    throw new Error("Worker has reservations");
  }

  await db.trade.deleteMany({
    where: {
      workerId: input.workerId,
    },
  });

  const images = await db.image.findMany({
    where: {
      userId: input.workerId,
    },
  });

  await utapi.deleteFiles(images.map((image) => image.url));

  await db.image.deleteMany({
    where: {
      userId: input.workerId,
    },
  });

  await db.reference.deleteMany({
    where: {
      workerId: input.workerId,
    },
  });

  await db.user.delete({
    where: {
      id: input.workerId,
    },
  });
};

export default deleteWorker;
