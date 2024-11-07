import { type CustomerIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const deleteCustomer = async (db: PrismaClient, input: CustomerIdInput) => {
  const customer = await db.customer.findUnique({
    where: {
      userId: input.customerId,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  const reservations = await db.reservation.findMany({
    where: {
      customerId: input.customerId,
    },
  });

  if (reservations.length > 0) {
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
