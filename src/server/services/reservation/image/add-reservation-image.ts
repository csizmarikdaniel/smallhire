import { utapi } from "@/server/api/uploadthing";
import { type SessionType } from "@/types";
import { type AddReservationImageInput } from "@/types/reservation";
import { type PrismaClient } from "@prisma/client";

const addReservationImage = async (
  db: PrismaClient,
  session: SessionType,
  input: AddReservationImageInput,
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

  if (!input.images) {
    throw new Error("No images provided");
  }

  if (input.images) {
    if (Array.isArray(input.images)) {
      const response = await utapi.uploadFiles(input.images);
      for (const file of response) {
        await db.image.create({
          data: {
            url: file.data?.key ?? "",
            reservationId: reservation.id,
            userId: session.user.id,
          },
        });
      }
    } else {
      if (input.images.size !== 0) {
        const response = await utapi.uploadFiles(input.images);
        await db.image.create({
          data: {
            url: response.data?.key ?? "",
            reservationId: reservation.id,
            userId: session.user.id,
          },
        });
      }
    }
  }

  return { success: true };
};

export default addReservationImage;
