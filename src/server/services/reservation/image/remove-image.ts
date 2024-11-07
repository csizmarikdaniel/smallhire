import { utapi } from "@/server/api/uploadthing";
import { type SessionType } from "@/types";
import { type RemoveReservationImageInput } from "@/types/reservation";
import { type PrismaClient } from "@prisma/client";

const removeImage = async (
  db: PrismaClient,
  session: SessionType,
  input: RemoveReservationImageInput,
) => {
  const reservation = await db.reservation.findUnique({
    where: {
      id: input.reservationId,
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  if (
    reservation.customerId !== session?.user.id &&
    reservation.workerId !== session?.user.id
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

  if (image.userId !== session?.user.id) {
    throw new Error("Unauthorized");
  }

  await utapi.deleteFiles(image.url);

  await db.image.delete({
    where: {
      id: input.imageId,
    },
  });

  return { success: true };
};

export default removeImage;
