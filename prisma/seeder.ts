import { PrismaClient } from "@prisma/client";
import { seedWorkers } from "./seeders/worker";
import { seedCustomers } from "./seeders/customers";
import { seedReservation } from "./seeders/reservation";
import { seedReferences } from "./seeders/references";
import { seedAdmin } from "./seeders/admin";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database");

  await seedWorkers(prisma);
  console.log();

  await seedCustomers(prisma);
  console.log();

  await seedReservation(prisma);
  console.log();

  await seedReferences(prisma);
  console.log();

  await seedAdmin(prisma);
  console.log();

  console.log("✅ Database seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
