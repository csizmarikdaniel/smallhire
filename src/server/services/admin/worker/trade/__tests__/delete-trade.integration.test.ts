import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import deleteTrade from "../delete-trade";

test("should delete trade", async () => {
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

  await prisma.trade.create({
    data: {
      id: "1",
      workerId: "1",
      name: "name",
      pricePerHour: 10,
      yearsOfExperience: 5,
    },
  });

  await prisma.trade.create({
    data: {
      id: "2",
      workerId: "1",
      name: "name",
      pricePerHour: 10,
      yearsOfExperience: 5,
    },
  });

  const data = await deleteTrade(prisma, {
    tradeId: "1",
  });

  expect(data.id).toEqual("1");
  expect(data.name).toEqual("name");
  expect(data.pricePerHour).toEqual(10);
  expect(data.yearsOfExperience).toEqual(5);

  const dbTrades = await prisma.trade.findMany({ where: { workerId: "1" } });

  expect(dbTrades).toHaveLength(1);
  expect(dbTrades[0]?.id).toEqual("2");
  expect(dbTrades[0]?.name).toEqual("name");
  expect(dbTrades[0]?.pricePerHour).toEqual(10);
  expect(dbTrades[0]?.yearsOfExperience).toEqual(5);
});
