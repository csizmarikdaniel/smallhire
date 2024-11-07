import { type AddCustomerInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const addCustomer = async (db: PrismaClient, input: AddCustomerInput) => {
  const dbCustomer = await db.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (dbCustomer) {
    throw new Error("User already exists");
  }

  const customer = await db.user.create({
    data: {
      name: input.name,
      password: input.password,
      email: input.email,
      phone: input.phone,
      city: input.city,
      zipCode: input.zipCode,
      address: input.address,
      role: "CUSTOMER",
    },
  });

  await db.customer.create({
    data: {
      userId: customer.id,
    },
  });

  return customer;
};

export default addCustomer;
