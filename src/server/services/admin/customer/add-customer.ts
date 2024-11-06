import { type AddCustomerInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const addCustomer = async (db: PrismaClient, input: AddCustomerInput) => {
  return await db.user.create({
    data: {
      name: input.name,
      password: input.password,
      email: input.email,
      phone: input.phone,
      city: input.city,
      zipCode: input.zipCode,
      address: input.address,
      role: "CUSTOMER",
      customer: {
        create: {},
      },
    },
  });
};

export default addCustomer;
