import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import addTrade from "../add-trade";

test("should add trade as worker", async () => {
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

  const data = await addTrade(
    prisma,
    { user: { id: "1", role: "WORKER" } },
    { name: "name", pricePerHour: 10, yearsOfExperience: 5 },
  );

  expect(data.name).toEqual("name");
  expect(data.pricePerHour).toEqual(10);
  expect(data.yearsOfExperience).toEqual(5);

  const trade = await prisma.trade.findUnique({
    where: {
      id: data.id,
    },
  });

  expect(trade?.name).toEqual("name");
  expect(trade?.pricePerHour).toEqual(10);
  expect(trade?.yearsOfExperience).toEqual(5);
});

test("should not add trade as customer", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email1@email.com",
      password: "password",
      role: "CUSTOMER",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  await prisma.customer.create({
    data: {
      userId: "1",
    },
  });

  await expect(
    addTrade(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { name: "name", pricePerHour: 10, yearsOfExperience: 5 },
    ),
  ).rejects.toThrow("Unauthorized");
});

test("should not add trade with not existing user", async () => {
  await expect(
    addTrade(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      { name: "name", pricePerHour: 10, yearsOfExperience: 5 },
    ),
  ).rejects.toThrow("User not found");
});

test("should not add trade with already existing trade", async () => {
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
      name: "name",
      pricePerHour: 10,
      yearsOfExperience: 5,
      workerId: "1",
    },
  });

  await expect(
    addTrade(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      { name: "name", pricePerHour: 10, yearsOfExperience: 5 },
    ),
  ).rejects.toThrow("Trade already exists");
});
