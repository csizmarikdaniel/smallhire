import { type CustomerIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getCustomer = async (db: PrismaClient, input: CustomerIdInput) => {
  const customer = await db.user.findUnique({
    where: {
      id: input.customerId,
      role: "CUSTOMER",
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

export default getCustomer;
