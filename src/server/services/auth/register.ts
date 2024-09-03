import type { PrismaClient } from "@prisma/client";
import type { RegisterInput } from "@/types/auth";

export const register = async (db: PrismaClient, input: RegisterInput) => {
  const dbUser = await db.user.findUnique({
    where: {
      email: input.email,
    },
  });
  if (dbUser) throw new Error("User already exists");

  // Create the user
  if (input.role === "WORKER") {
    await db.user.create({
      data: { ...input, worker: { create: {} } },
    });
  } else {
    await db.user.create({
      data: { ...input, customer: { create: {} } },
    });
  }

  return { success: true };
};
