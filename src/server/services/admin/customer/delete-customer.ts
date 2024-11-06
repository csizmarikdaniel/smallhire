import { type CustomerIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const deleteCustomer = async (db: PrismaClient, input: CustomerIdInput) => {
  const reservations = await db.reservation.findMany({
    where: {
      customerId: input.customerId,
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
      userId: input.customerId,
    },
  });

  await db.user.delete({
    where: {
      id: input.customerId,
    },
  });

  return { success: true };
};

export default deleteCustomer;
