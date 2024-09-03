import { PrismaClient } from "@prisma/client";
import { seedWorkers } from "./seeders/worker";
import { seedCustomers } from "./seeders/customers";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database");

  await seedWorkers(prisma);
  console.log();

  await seedCustomers(prisma);
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
