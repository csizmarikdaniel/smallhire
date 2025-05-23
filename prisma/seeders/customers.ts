import type { PrismaClient } from "@prisma/client";
import { fakerHU as faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

export const seedCustomers = async (prisma: PrismaClient) => {
  console.log("🌱 Seeding customers");

  try {
    for (let i = 0; i < 10; i++) {
      await prisma.user.create({
        data: {
          email: `customer${i}@email.com`,
          password: bcrypt.hashSync("password", 10),
          role: "CUSTOMER",
          name: faker.person.fullName(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          zipCode: faker.location.zipCode(),
          phone: faker.phone.number(),
          customer: {
            create: {},
          },
        },
      });
    }
    console.log("✅ Customers seeded");
  } catch (error) {
    console.log("❌ Seeding failed");
    console.group();
    console.log(error);
    console.groupEnd();
  }
};
