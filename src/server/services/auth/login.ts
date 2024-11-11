import type { LoginInput } from "@/types/auth";
import { encrypt } from "@/utils/auth";
import type { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const login = async (db: PrismaClient, input: LoginInput) => {
  // Verify credentials && get the user
  const dbUser = await db.user.findUnique({
    where: {
      email: input.email,
    },
  });
  if (!dbUser) throw new Error("Nem megfelelő email vagy jelszó!");
  if (!bcrypt.compareSync(input.password, dbUser.password))
    throw new Error("Nem megfelelő email vagy jelszó!");

  const user = {
    id: dbUser.id,
    role: dbUser.role,
  };
  // Create the session
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });

  return { user: user };
};

export default login;
