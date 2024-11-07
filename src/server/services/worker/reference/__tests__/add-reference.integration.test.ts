import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import addReference from "../add-reference";

test("should add reference as worker", async () => {
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

  const data = await addReference(
    prisma,
    { user: { id: "1", role: "WORKER" } },
    { description: "description", images: [] },
  );

  expect(data).toEqual({ success: true });
});

test("should not add reference as customer", async () => {
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
    addReference(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { description: "description", images: [] },
    ),
  ).rejects.toThrow("User is not a worker");
});

test("should return error if user not found", async () => {
  await expect(
    addReference(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      { description: "description", images: [] },
    ),
  ).rejects.toThrow("User not found");
});

test("should return error if invalid file type", async () => {
  //TODO
});
