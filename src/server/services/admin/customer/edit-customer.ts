import type { EditCustomerInput } from "@/types/customer";
import type { PrismaClient } from "@prisma/client";

export const editCustomer = async (
  db: PrismaClient,
  input: EditCustomerInput,
) => {
  const customer = await db.customer.update({
    where: { userId: input.id },
    data: {
      user: {
        update: {
          email: input.email,
          name: input.name,
          address: input.address,
          city: input.city,
          zipCode: input.zipCode,
        },
      },
    },
  });
  return customer;
};
