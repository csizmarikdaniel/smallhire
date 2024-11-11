import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import editTrade from "../edit-trade";

test("should edit trade", async () => {
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

  const data = await editTrade(prisma, {
    id: "1",
    workerId: "1",
    name: "newName",
    pricePerHour: 15,
    yearsOfExperience: 5,
  });

  expect(data.id).toEqual("1");
  expect(data.name).toEqual("newName");
  expect(data.pricePerHour).toEqual(15);
  expect(data.yearsOfExperience).toEqual(5);
});

test("should throw error if trade already exists", async () => {
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

  await expect(
    editTrade(prisma, {
      id: "2",
      workerId: "1",
      name: "name",
      pricePerHour: 15,
      yearsOfExperience: 5,
    }),
  ).rejects.toThrow("Ez a szakma már létezik");
});
