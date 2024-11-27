import { prisma } from "@/test/setup-db";
import { test, expect } from "vitest";
import editCustomer from "../edit-customer";

test("should edit customer", async () => {
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
      role: "CUSTOMER",
      address: "address2",
      phone: "phone2",
      name: "name2",
      city: "city2",
      zipCode: "zipCode2",
    },
  });

  await prisma.customer.create({
    data: {
      userId: "2",
    },
  });

  await prisma.user.create({
    data: {
      id: "3",
      email: "email3@email.com",
      password: "password",
      role: "WORKER",
      address: "address3",
      phone: "phone3",
      name: "name3",
      city: "city3",
      zipCode: "zipCode3",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "3",
    },
  });

  const reservation = await prisma.reservation.create({
    data: {
      customerId: "1",
      description: "description1",
      startDate: new Date("2022-01-01T00:00:00.000Z"),
      endDate: new Date("2022-01-02T00:00:00.000Z"),
      status: "RESERVED",
      workerId: "3",
    },
  });

  const data = await editCustomer(prisma, {
    email: "email2@email.com",
    reservationId: reservation.id,
  });

  expect(data.success).toEqual(true);
});
test("should throw error if customer not found", async () => {
  await expect(
    editCustomer(prisma, {
      email: "email1@email.com",
      reservationId: "1",
    }),
  ).rejects.toThrowError("Nem létezik ezzel az email címmel felhasználó.");
});

test("should throw error if email does not belong to a customer", async () => {
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
    editCustomer(prisma, {
      email: "email1@email.com",
      reservationId: "1",
    }),
  ).rejects.toThrowError("A felhasználó nem megrendelő.");
});
