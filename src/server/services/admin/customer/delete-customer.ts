import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const deleteCustomer = async (db: PrismaClient, customerId: string) => {
  const session = await getSession();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const reservations = await db.reservation.findMany({
    where: {
      customerId,
    },
  });

  if (
    reservations.length > 0 /*  &&
    reservations.filter((reservation) => {
      return (
        reservation.status !== "CANCELLED" &&
        reservation.status !== "REJECTED" &&
        reservation.status !== "REJECTEDOFFER" &&
        reservation.status !== "COMPLETED"
      );
    }).length > 0 */
  ) {
    throw new Error("Customer has reservations");
  }

  await db.customer.delete({
    where: {
      userId: customerId,
    },
  });

  await db.user.delete({
    where: {
      id: customerId,
    },
  });

  return { success: true };
};

export default deleteCustomer;
