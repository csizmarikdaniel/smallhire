import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getReservation from "../get-reservation";

test("should get reservation as worker", async () => {
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
      address: "address2",
      phone: "phone2",
      name: "name2",
      city: "city2",
      zipCode: "zipCode2",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "2",
    },
  });

  const reservation = await prisma.reservation.create({
    data: {
      customerId: "1",
      workerId: "2",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-01-02"),
      description: "description",
      status: "RESERVED",
    },
  });

  const data = await getReservation(
    prisma,
    { user: { id: "1", role: "WORKER" } },
    { reservationId: reservation.id },
  );

  expect(data.address).toBe("address1");
  expect(data.city).toBe("city1");
  expect(data.zipCode).toBe("zipCode1");
  expect(data.description).toBe("description");
  expect(data.startDate).toEqual(new Date("2026-01-01"));
  expect(data.endDate).toEqual(new Date("2026-01-02"));
  expect(data.name).toBe("name1");
  expect(data.phone).toBe("phone1");
  expect(data.price).toBe(null);
  expect(data.status).toBe("RESERVED");
});

test("should get reservation as customer", async () => {
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
      address: "address2",
      phone: "phone2",
      name: "name2",
      city: "city2",
      zipCode: "zipCode2",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "2",
    },
  });

  const reservation = await prisma.reservation.create({
    data: {
      customerId: "1",
      workerId: "2",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-01-02"),
      description: "description",
      status: "RESERVED",
    },
  });

  const data = await getReservation(
    prisma,
    { user: { id: "1", role: "CUSTOMER" } },
    { reservationId: reservation.id },
  );

  expect(data.description).toBe("description");
  expect(data.startDate).toEqual(new Date("2026-01-01"));
  expect(data.endDate).toEqual(new Date("2026-01-02"));
  expect(data.name).toBe("name2");
  expect(data.status).toBe("RESERVED");
  expect(data.price).toBe(null);
  expect(data.address).toBe("address2");
  expect(data.city).toBe("city2");
  expect(data.zipCode).toBe("zipCode2");
  expect(data.phone).toBe("phone2");
});
