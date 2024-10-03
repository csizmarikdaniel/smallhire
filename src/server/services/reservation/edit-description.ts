import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const editDescription = async (
  db: PrismaClient,
  input: { id: string; description: string },
) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const reservation = await db.reservation.update({
    where: {
      id: input.id,
    },
    data: {
      description: input.description,
    },
  });

  await db.notification.create({
    data: {
      title: "Leírás módosítás",
      description: `A leírás módosítva lett a foglaláshoz`,
      reservationId: input.id,
      userId:
        session.user.role === "CUSTOMER"
          ? reservation.workerId
          : reservation.customerId,
    },
  });

  return;
};

export default editDescription;
