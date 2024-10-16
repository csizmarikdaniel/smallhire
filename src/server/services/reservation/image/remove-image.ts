import { utapi } from "@/server/api/uploadthing";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const removeImage = async (
  db: PrismaClient,
  input: { reservationId: string; imageId: string },
) => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const reservation = await db.reservation.findUnique({
    where: {
      id: input.reservationId,
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  if (
    reservation.customerId !== session.user.id &&
    reservation.workerId !== session.user.id
  ) {
    throw new Error("Unauthorized");
  }

  const image = await db.image.findUnique({
    where: {
      id: input.imageId,
    },
  });

  if (!image) {
    throw new Error("Image not found");
  }

  if (image.reservationId !== input.reservationId) {
    throw new Error("Image not found in reservation");
  }

  await utapi.deleteFiles(image.url);

  await db.image.delete({
    where: {
      id: input.imageId,
    },
  });

  await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      images: {
        disconnect: {
          id: input.imageId,
        },
      },
    },
  });

  return true;
};

export default removeImage;
