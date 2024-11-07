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
    const user = await db.user.create({
      data: { ...input },
    });
    await db.worker.create({
      data: {
        userId: user.id,
      },
    });
    await db.notification.create({
      data: {
        title: "Hiányzó adatok",
        description:
          "Kérlek adj meg képzettségeket és referenciákat, hogy könnyebben megtaláljanak a megrendelők!",
        userId: user.id,
      },
    });
  } else {
    const customer = await db.user.create({
      data: { ...input },
    });
    await db.customer.create({
      data: {
        userId: customer.id,
      },
    });
  }

  return { success: true, role: input.role };
};
