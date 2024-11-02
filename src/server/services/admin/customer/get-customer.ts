import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getCustomer = async (db: PrismaClient, input: { customerId: string }) => {
  const session = await getSession();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const customer = await db.user.findUnique({
    where: {
      id: input.customerId,
    },
  });

  return customer;
};

export default getCustomer;
