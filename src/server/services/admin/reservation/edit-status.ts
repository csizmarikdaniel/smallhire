import { EditStatusInput } from "@/types/admin";
import { PrismaClient } from "@prisma/client";

const editStatus = async (db: PrismaClient, input: EditStatusInput) => {
  await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      status: input.status,
    },
  });
  return { success: true };
};

export default editStatus;
