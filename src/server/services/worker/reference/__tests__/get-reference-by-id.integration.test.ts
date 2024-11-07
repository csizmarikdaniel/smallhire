import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getReferenceById from "../get-reference-by-id";

test("should get reference by id as worker", async () => {
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

  await prisma.reference.create({
    data: {
      id: "2",
      description: "description",
      workerId: "1",
    },
  });

  const data = await getReferenceById(
    prisma,
    { user: { id: "1", role: "WORKER" } },
    { referenceId: "2" },
  );

  expect(data).toEqual({
    id: "2",
    description: "description",
    workerId: "1",
    image: [],
  });
});

test("should not get reference by id as customer", async () => {
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
    getReferenceById(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { referenceId: "1" },
    ),
  ).rejects.toThrow("Unauthorized");
});

test("should not get reference by id as worker if not found", async () => {
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

  await expect(
    getReferenceById(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      { referenceId: "1" },
    ),
  ).rejects.toThrow("Reference not found");
});

test("should return error if reference does not belong to worker", async () => {
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
      workerId: "2",
    },
  });

  await expect(
    getReferenceById(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      { referenceId: "1" },
    ),
  ).rejects.toThrow("Unauthorized");
});
