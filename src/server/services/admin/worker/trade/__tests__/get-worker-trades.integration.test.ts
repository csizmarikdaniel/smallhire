import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getWorkerTrades from "../get-worker-trades";

test("should get worker trades", async () => {
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
      name: "name2",
      pricePerHour: 20,
      yearsOfExperience: 10,
    },
  });

  const data = await getWorkerTrades(prisma, {
    workerId: "1",
  });

  expect(data.length).toEqual(2);
  expect(data[0]?.id).toEqual("1");
  expect(data[1]?.id).toEqual("2");
});

test("should return empty array if worker has no trades", async () => {
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

  const data = await getWorkerTrades(prisma, {
    workerId: "1",
  });

  expect(data.length).toEqual(0);
});

test("should throw error if worker does not exist", async () => {
  await expect(getWorkerTrades(prisma, { workerId: "1" })).rejects.toThrowError(
    "Worker not found",
  );
});
