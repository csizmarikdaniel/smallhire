import type { PrismaClient } from "@prisma/client";
import { fakerHU as faker } from "@faker-js/faker";

export const seedAdmin = async (prisma: PrismaClient) => {
  console.log("🌱 Seeding admin");

  try {
    await prisma.user.create({
      data: {
        email: "admin@smallhire.com",
        password: "Qwer1234",
        role: "ADMIN",
        name: "Admin",
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        phone: faker.phone.number(),
      },
    });
    console.log("✅ Admin seeded");
  } catch (error) {
    console.log("❌ Seeding failed");
    console.group();
    console.log(error);
    console.groupEnd();
  }
};
