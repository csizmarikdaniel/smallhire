import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getTrades from "../get-trades";

test("should get trades as worker", async () => {
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

  const trade1 = await prisma.trade.create({
    data: {
      name: "name",
      pricePerHour: 10,
      yearsOfExperience: 5,
      workerId: "1",
    },
  });

  const trade2 = await prisma.trade.create({
    data: {
      name: "name2",
      pricePerHour: 20,
      yearsOfExperience: 10,
      workerId: "1",
    },
  });

  const data = await getTrades(
    prisma,
    { user: { id: "1", role: "WORKER" } },
    { id: "1" },
  );

  expect(data).toHaveLength(2);
  expect(data[0]).toEqual({
    name: "name",
    pricePerHour: 10,
    yearsOfExperience: 5,
    id: trade1.id,
  });
  expect(data[1]).toEqual({
    name: "name2",
    pricePerHour: 20,
    yearsOfExperience: 10,
    id: trade2.id,
  });
});
