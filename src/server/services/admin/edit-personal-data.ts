import { type EditUserInput } from "@/types/profile";
import { type PrismaClient } from "@prisma/client";

const editPersonalData = async (db: PrismaClient, input: EditUserInput) => {
  const user = await db.user.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      address: input.address,
      city: input.city,
      zipCode: input.zipCode,
    },
  });

  return user;
};

export default editPersonalData;
