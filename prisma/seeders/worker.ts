import type { PrismaClient } from "@prisma/client";
import { fakerHU as faker } from "@faker-js/faker";

export const seedWorkers = async (prisma: PrismaClient) => {
  console.log("🌱 Seeding workers");

  const trades = [
    "Villanyszerelő",
    "Vízvezeték-szerelő",
    "Asztalos",
    "Kőműves",
    "Festő",
    "Burkoló",
    "Kertész",
    "Autószerelő",
    "Gépész",
    "Vasbetonszerelő",
  ];

  try {
    for (let i = 0; i < 30; i++) {
      const i1 = faker.number.int({ min: 0, max: trades.length - 1 });
      const i2 = faker.number.int({ min: 0, max: trades.length - 1 });
      const selectedTrades = [trades[i1], trades[i2 == i1 ? i1 + 1 : i2]];
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
                createMany: {
                  data: [
                    {
                      name: selectedTrades[0] ?? "Villanyszerelő",
                      yearsOfExperience: faker.number.int({ min: 1, max: 20 }),
                      pricePerHour: faker.number.int({ min: 1000, max: 5000 }),
                    },
                    {
                      name: selectedTrades[1] ?? "Vízvezeték-szerelő",
                      yearsOfExperience: faker.number.int({ min: 1, max: 20 }),
                      pricePerHour: faker.number.int({ min: 1000, max: 5000 }),
                    },
                  ],
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
