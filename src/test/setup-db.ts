import { PrismaClient } from "@prisma/client";
import { beforeAll, beforeEach, afterAll, afterEach } from "vitest";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$executeRaw`PRAGMA foreign_keys=OFF`;
  await prisma.$executeRaw`BEGIN TRANSACTION`;
});

beforeEach(async () => {
  await prisma.admin.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.image.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.reference.deleteMany();
  await prisma.trade.deleteMany();
  await prisma.worker.deleteMany();
  await prisma.user.deleteMany();
});

afterEach(async () => {
  // Optional: Further cleanup actions after each test
});

afterAll(async () => {
  await prisma.$executeRaw`ROLLBACK`;
  await prisma.$disconnect();
});

export { prisma };
