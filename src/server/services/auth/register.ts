import type { PrismaClient } from "@prisma/client";
import type { RegisterInput } from "@/types/auth";

export const register = async (db: PrismaClient, input: RegisterInput) => {
  console.log("register", input);
  const dbUser = await db.user.findUnique({
    where: {
      email: input.email,
    },
  });
  if (dbUser) throw new Error("User already exists");

  // Create the user
  const user = await db.user.create({
    data: input,
  });

  return { user };
};
