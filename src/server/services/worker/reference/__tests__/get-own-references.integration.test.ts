import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getOwnReferences from "../get-own-references";

test("should get own references as worker", async () => {
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

  await prisma.reference.create({
    data: {
      id: "1",
      description: "description",
      workerId: "1",
    },
  });

  const data = await getOwnReferences(prisma, {
    user: { id: "1", role: "WORKER" },
  });

  expect(data).toEqual([{ id: "1" }]);
});

test("should not get own references as customer", async () => {
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
    getOwnReferences(prisma, { user: { id: "1", role: "CUSTOMER" } }),
  ).rejects.toThrow("Not authorized");
});

test("should return error if user not found", async () => {
  await expect(
    getOwnReferences(prisma, { user: { id: "1", role: "WORKER" } }),
  ).rejects.toThrow("User not found");
});

test("should return empty array if no references found", async () => {
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

  const data = await getOwnReferences(prisma, {
    user: { id: "1", role: "WORKER" },
  });

  expect(data).toEqual([]);
});
