import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getWorkerReservedDays from "../get-worker-reserved-days";

test("should return reserved days of a worker", async () => {
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

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
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
      userId: "2",
    },
  });

  await prisma.reservation.create({
    data: {
      description: "description",
      endDate: new Date("2024.11.10"),
      startDate: new Date("2024.11.05"),
      status: "RESERVED",
      customerId: "2",
      workerId: "1",
    },
  });

  await prisma.reservation.create({
    data: {
      description: "description",
      endDate: new Date("2024.12.10"),
      startDate: new Date("2024.12.05"),
      status: "RESERVED",
      customerId: "2",
      workerId: "1",
    },
  });

  const days = await getWorkerReservedDays(prisma, { workerId: "1" });

  expect(days.length).toEqual(12);
});

test("should return empty array if worker has no reservations", async () => {
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

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
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
      userId: "2",
    },
  });

  const days = await getWorkerReservedDays(prisma, { workerId: "1" });

  expect(days.length).toEqual(0);
});

test("should return empty array if worker has no reservations with status RESERVED/CREATEDOFFER/ACCEPTEDOFFER/COMPLETED", async () => {
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

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
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
      userId: "2",
    },
  });

  await prisma.reservation.create({
    data: {
      description: "description",
      endDate: new Date("2024.11.10"),
      startDate: new Date("2024.11.05"),
      status: "CANCELED",
      customerId: "2",
      workerId: "1",
    },
  });

  const days = await getWorkerReservedDays(prisma, { workerId: "1" });

  expect(days.length).toEqual(0);
});
