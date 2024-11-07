import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import deleteTrade from "../delete-trade";

test("should delete trade as worker", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email1@email.com",
      password: "password",
      role: "WORKER",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "1",
    },
  });

  const trade = await prisma.trade.create({
    data: {
      name: "name",
      pricePerHour: 10,
      yearsOfExperience: 5,
      workerId: "1",
    },
  });

  const data = await deleteTrade(prisma, { tradeId: trade.id });

  expect(data).toEqual({ success: true });

  const deletedTrade = await prisma.trade.findUnique({
    where: {
      id: trade.id,
    },
  });

  expect(deletedTrade).toBeNull();
});
