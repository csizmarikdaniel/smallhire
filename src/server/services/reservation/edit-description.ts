import { type PrismaClient } from "@prisma/client";

const editDescription = async (
  db: PrismaClient,
  input: { id: string; description: string },
) => {
  await db.reservation.update({
    where: {
      id: input.id,
    },
    data: {
      description: input.description,
    },
  });
  return "ok";
};

export default editDescription;
