import { utapi } from "@/server/api/uploadthing";
import { type SessionType } from "@/types";
import { type CreateReservationInput } from "@/types/reservation";
import { type PrismaClient } from "@prisma/client";

const createReservation = async (
  db: PrismaClient,
  session: SessionType,
  input: CreateReservationInput,
) => {
  if (session?.user.role !== "CUSTOMER") {
    throw new Error("Unauthorized");
  }

  if (input.endDate && input.startDate > input.endDate) {
    throw new Error("Start date must be before end date");
  }

  if (input.startDate <= new Date()) {
    throw new Error("Start date must be in the future");
  }

  const worker = await db.worker.findUnique({
    where: {
      userId: input.formData.workerId,
    },
  });

  if (!worker) {
    throw new Error("Worker not found");
  }

  const workerReservations = await db.reservation.findMany({
    where: {
      workerId: input.formData.workerId,
      startDate: {
        lte: input.endDate,
      },
      endDate: {
        gte: input.startDate,
      },
    },
  });
  if (workerReservations.length > 0) {
    throw new Error("Worker is already reserved in this time period");
  }

  const reservation = await db.reservation.create({
    data: {
      customerId: session.user.id,
      workerId: input.formData.workerId,
      startDate: input.startDate,
      endDate: input.endDate ?? input.startDate,
      description: input.formData.description,
      status: "RESERVED",
    },
  });
  await db.notification.create({
    data: {
      title: "Új foglalás",
      description: `Új foglalás érkezett a(z) ${reservation.startDate.toLocaleDateString("hu-HU")} - ${reservation.endDate.toLocaleDateString("hu-HU")} időszakra`,
      reservationId: reservation.id,
      userId: reservation.workerId,
    },
  });

  if (input.formData.images) {
    if (Array.isArray(input.formData.images)) {
      const response = await utapi.uploadFiles(input.formData.images);
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
      if (input.formData.images.size !== 0) {
        const response = await utapi.uploadFiles(input.formData.images);
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
  return reservation.id;
};

export default createReservation;
