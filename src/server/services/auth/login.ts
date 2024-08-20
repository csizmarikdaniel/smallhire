import type { LoginInput } from "@/types/auth";
import { encrypt } from "@/utils/auth";
import type { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export const login = async (db: PrismaClient, input: LoginInput) => {
  // Verify credentials && get the user
  const dbUser = await db.user.findUnique({
    where: {
      email: input.email,
    },
  });
  if (!dbUser) throw new Error("User not found");
  if (dbUser.password !== input.password) throw new Error("Invalid password");

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ dbUser, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });

  return { user: dbUser };
};
