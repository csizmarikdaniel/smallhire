import { type SessionType } from "@/types";
import { type EditDescriptionInput } from "@/types/reservation";
import { type PrismaClient } from "@prisma/client";

const editDescription = async (
  db: PrismaClient,
  session: SessionType,
  input: EditDescriptionInput,
) => {
  const reservation = await db.reservation.findUnique({
    where: {
      id: input.reservationId,
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      description: input.description,
    },
  });

  await db.notification.create({
    data: {
      title: "Leírás módosítás",
      description: `A leírás módosítva lett a foglaláshoz`,
      reservationId: input.reservationId,
      userId:
        session?.user.role === "CUSTOMER"
          ? reservation.workerId
          : reservation.customerId,
    },
  });

  return { success: true };
};

export default editDescription;
