import { type AdminEditProfileInput } from "@/types/admin";
import { type PrismaClient } from "@prisma/client";

const editPersonalData = async (
  db: PrismaClient,
  input: AdminEditProfileInput,
) => {
  const dbUser = await db.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (dbUser && dbUser.id !== input.id) {
    throw new Error("Ez az email cím már foglalt");
  }

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
