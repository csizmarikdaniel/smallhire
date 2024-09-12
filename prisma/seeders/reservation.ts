import { type PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

export const seedReservation = async (db: PrismaClient) => {
  console.log("🌱 Seeding reservations");
  try {
    const workers = await db.user.findMany({
      where: {
        role: "WORKER",
      },
    });
    const customers = await db.user.findMany({
      where: {
        role: "CUSTOMER",
      },
    });
    const reservations = [];
    const statusOptions = [
      "RESERVED",
      "CANCELLED",
      "REJECTED",
      "CREATEDOFFER",
      "ACCEPTEDOFFER",
      "REJECTEDOFFER",
      "COMPLETED",
    ];
    for (let i = 0; i < 10; i++) {
      const worker = workers[Math.floor(Math.random() * workers.length)];
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const startDate = faker.date.recent();
      const endDate = faker.date.future();
      reservations.push({
        workerId: worker?.id ?? "",
        customerId: customer?.id ?? "",
        startDate: startDate,
        endDate: endDate,
        status:
          statusOptions[Math.floor(Math.random() * statusOptions.length)] ??
          "RESERVED",
        description: faker.lorem.sentence(),
      });
    }
    await db.reservation.createMany({
      data: reservations,
    });
    console.log("✅ Reservations seeded");
  } catch (error) {
    console.log("❌ Seeding failed");
    console.group();
    console.log(error);
    console.groupEnd();
  }
};
