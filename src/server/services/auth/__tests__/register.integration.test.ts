import { expect, test } from "vitest";
import { register } from "../register";
import { prisma } from "@/test/setup-db";

test("should register customer", async () => {
  const result = await register(prisma, {
    email: "email1@email.com",
    password: "password",
    name: "name1",
    phone: "phone1",
    address: "address1",
    city: "city1",
    zipCode: "zipCode1",
    role: "CUSTOMER",
  });

  expect(result.success).toEqual(true);

  const dbUser = await prisma.user.findUnique({
    where: { email: "email1@email.com" },
  });

  expect(dbUser).not.toBeNull();
  expect(
    await prisma.customer.findUnique({ where: { userId: dbUser?.id } }),
  ).not.toBeNull();
});

test("should register worker", async () => {
  const result = await register(prisma, {
    email: "email1@email.com",
    password: "password",
    name: "name1",
    phone: "phone1",
    address: "address1",
    city: "city1",
    zipCode: "zipCode1",
    role: "WORKER",
  });

  expect(result.success).toEqual(true);

  const dbUser = await prisma.user.findUnique({
    where: { email: "email1@email.com" },
  });

  expect(dbUser).not.toBeNull();
  expect(
    await prisma.worker.findUnique({ where: { userId: dbUser?.id } }),
  ).not.toBeNull();
});

test("should throw error if email is already taken", async () => {
  await prisma.user.create({
    data: {
      email: "email1@email.com",
      password: "password",
      name: "name1",
      phone: "phone1",
      address: "address1",
      city: "city1",
      zipCode: "zipCode1",
      role: "WORKER",
    },
  });

  await expect(
    register(prisma, {
      email: "email1@email.com",
      password: "password",
      name: "name1",
      phone: "phone1",
      address: "address1",
      city: "city1",
      zipCode: "zipCode1",
      role: "WORKER",
    }),
  ).rejects.toThrowError("Ez az email cím már használatban van!");
});
