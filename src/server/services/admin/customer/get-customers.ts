import { type AdminListCustomersInput } from "@/types/admin";
import { paginate } from "@/utils/paginate";
import { type PrismaClient } from "@prisma/client";

const getCustomers = async (
  db: PrismaClient,
  input: AdminListCustomersInput,
) => {
  const customers = await db.user.findMany({
    where: {
      role: "CUSTOMER",
      name: {
        contains: input.search,
      },
    },
  });

  return {
    fullListLength: customers.length,
    customers: paginate(customers, {
      page: input.page,
      perPage: input.limit,
    }),
  };
};

export default getCustomers;
