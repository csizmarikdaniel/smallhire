import { type AddCustomerInput } from "@/types/admin";
import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const addCustomer = async (db: PrismaClient, input: AddCustomerInput) => {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
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
