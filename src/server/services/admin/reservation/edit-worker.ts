import { type EditReservationUserInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const editWorker = async (
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
  if (user.role !== "WORKER") {
    throw new Error("A felhasználó nem szakember.");
  }
  await db.reservation.update({
    where: {
      id: input.reservationId,
    },
    data: {
      workerId: user.id,
    },
  });
  return { success: true };
};

export default editWorker;
