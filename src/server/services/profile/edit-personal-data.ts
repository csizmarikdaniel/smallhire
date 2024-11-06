import { type SessionType } from "@/types";
import { type EditUserInput } from "@/types/profile";
import { type PrismaClient } from "@prisma/client";

const editPersonalData = async (
  db: PrismaClient,
  session: SessionType,
  input: EditUserInput,
) => {
  const user = await db.user.findUnique({ where: { id: session?.user.id } });
  if (!user) {
    throw new Error("User not found");
  }
  const updatedUser = await db.user.update({
    where: { id: user?.id },
    data: {
      name: input.name,
      address: input.address,
      city: input.city,
      zipCode: input.zipCode,
      phone: input.phone,
    },
  });
  return updatedUser;
};

export default editPersonalData;
