import { type PrismaClient } from "@prisma/client";

export const listCustomer = async (db: PrismaClient) => {
  const customers = await db.customer.findMany();
  return customers;
};
