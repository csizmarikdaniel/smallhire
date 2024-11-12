import { type EditDatesInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const editDates = async (db: PrismaClient, input: EditDatesInput) => {
  await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      startDate: input.startDate,
      endDate: input.endDate,
    },
  });
  return { success: true };
};

export default editDates;
