import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import deleteCustomer from "../delete-customer";

test("should delete customer", async () => {
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

  const data = await deleteCustomer(prisma, { customerId: "1" });

  expect(data.success).toEqual(true);
  expect(await prisma.user.findUnique({ where: { id: "1" } })).toEqual(null);
  expect(await prisma.customer.findUnique({ where: { userId: "1" } })).toEqual(
    null,
  );
});

test("should throw error if customer not found", async () => {
  await expect(
    deleteCustomer(prisma, { customerId: "1" }),
  ).rejects.toThrowError("Customer not found");
});

test("should throw error if customer has reservations", async () => {
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

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
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
      userId: "2",
    },
  });

  await prisma.reservation.create({
    data: {
      id: "1",
      customerId: "1",
      description: "description",
      endDate: new Date(),
      startDate: new Date(),
      status: "RESERVED",
      workerId: "2",
    },
  });

  await expect(
    deleteCustomer(prisma, { customerId: "1" }),
  ).rejects.toThrowError("Customer has reservations");
});
