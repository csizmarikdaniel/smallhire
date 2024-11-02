import { type AdminListCustomersInput } from "@/types/admin";
import { getSession } from "@/utils/auth";
import { paginate } from "@/utils/paginate";
import { type PrismaClient } from "@prisma/client";

const getCustomers = async (
  db: PrismaClient,
  input: AdminListCustomersInput,
) => {
  const session = await getSession();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

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
