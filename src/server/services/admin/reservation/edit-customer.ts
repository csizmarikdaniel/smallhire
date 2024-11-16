import { type EditReservationUserInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const editCustomer = async (
  db: PrismaClient,
  input: EditReservationUserInput,
) => {
  const user = await db.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (!user) {
    throw new Error("Nem létezik ezzel az email címmel felhasználó.");
  }
  await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      customerId: user.id,
    },
  });
  return { success: true };
};

export default editCustomer;
