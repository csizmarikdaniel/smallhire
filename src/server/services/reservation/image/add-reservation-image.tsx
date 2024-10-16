import { utapi } from "@/server/api/uploadthing";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const addReservationImage = async (
  db: PrismaClient,
  input: { images: File[] | File | null; reservationId: string },
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
          },
        });
      }
    } else {
      const response = await utapi.uploadFiles(input.images);
      await db.image.create({
        data: {
          url: response.data?.key ?? "",
          reservationId: reservation.id,
        },
      });
    }
  }

  return { success: true };
};

export default addReservationImage;
