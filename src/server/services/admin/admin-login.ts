import { encrypt } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const adminLogin = async (
  db: PrismaClient,
  input: { email: string; password: string },
) => {
  const admin = await db.user.findFirst({
    where: {
      email: input.email,
      password: input.password,
    },
  });

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Invalid credentials");
  }

  const user = {
    id: admin.id,
    role: admin.role,
  };
  // Create the session
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });

  return { user: user };
};

export default adminLogin;
