import type { PrismaClient } from "@prisma/client";
import { fakerHU as faker } from "@faker-js/faker";

export const seedWorkers = async (prisma: PrismaClient) => {
  console.log("🌱 Seeding workers");

  try {
    for (let i = 0; i < 10; i++) {
      await prisma.user.create({
        data: {
          email: `worker${i}@email.com`,
          password: "password",
          role: "WORKER",
          name: faker.person.fullName(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          zipCode: faker.location.zipCode(),
          phone: faker.phone.number(),
          worker: {
            create: {
              trades: {
                create: {
                  name: "Villanyszerelő",
                  yearsOfExperience: faker.number.int({ min: 1, max: 20 }),
                },
              },
            },
          },
        },
      });
    }
    console.log("✅ Workers seeded");
  } catch (error) {
    console.log("❌ Seeding failed");
    console.group();
    console.log(error);
    console.groupEnd();
  }
};
