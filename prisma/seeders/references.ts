import { type PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

export const seedReferences = async (db: PrismaClient) => {
  console.log("🌱 Seeding references");
  try {
    const workers = await db.user.findMany({
      where: {
        role: "WORKER",
      },
    });
    for (const worker of workers) {
      for (let i = 0; i < faker.number.int({ min: 0, max: 5 }); i++) {
        await db.reference.create({
          data: {
            workerId: worker?.id ?? "",
            description: faker.lorem.sentence(),
          },
        });
      }
    }
    console.log("✅ References seeded");
  } catch (error) {
    console.log("❌ Seeding failed");
    console.group();
    console.log(error);
    console.groupEnd();
  }
};
