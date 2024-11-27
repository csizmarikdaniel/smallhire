import { type EditDatesInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const editDates = async (db: PrismaClient, input: EditDatesInput) => {
  if (input.startDate > input.endDate) {
    throw new Error("Start date must be before end date");
  }

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
