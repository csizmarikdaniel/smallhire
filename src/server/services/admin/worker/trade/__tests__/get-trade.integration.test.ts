import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getTrade from "../get-trade";

test("should get trade", async () => {
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

  const data = await getTrade(prisma, {
    tradeId: "1",
  });

  expect(data?.id).toEqual("1");
  expect(data?.name).toEqual("name");
  expect(data?.pricePerHour).toEqual(10);
  expect(data?.yearsOfExperience).toEqual(5);
});

test("should return null if trade does not exist", async () => {
  const data = await getTrade(prisma, {
    tradeId: "1",
  });

  expect(data).toBeNull();
});
