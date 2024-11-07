import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import createReservation from "../create-reservation";

test("create reservation", async () => {
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

  const data = await createReservation(
    prisma,
    { user: { id: "1", role: "CUSTOMER" } },
    {
      formData: { description: "description", workerId: "2", images: [] },
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-01-02"),
    },
  );
  expect(data).toBeDefined();

  const reservation = await prisma.reservation.findFirst({
    where: {
      id: data,
    },
  });

  expect(reservation?.description).toEqual("description");
  expect(reservation?.customerId).toEqual("1");
  expect(reservation?.workerId).toEqual("2");
  expect(reservation?.status).toEqual("RESERVED");
  expect(reservation?.startDate).toEqual(new Date("2026-01-01"));
  expect(reservation?.endDate).toEqual(new Date("2026-01-02"));

  const notification = await prisma.notification.findFirst({
    where: {
      reservationId: data,
    },
  });

  expect(notification?.title).toEqual("Új foglalás");
  expect(notification?.description).toEqual(
    `Új foglalás érkezett a(z) ${reservation?.startDate?.toLocaleDateString("hu-HU")} - ${reservation?.endDate?.toLocaleDateString("hu-HU")} időszakra`,
  );
  expect(notification?.userId).toEqual("2");
});

test("create reservation with invalid start date", async () => {
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

  await expect(
    createReservation(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      {
        formData: { description: "description", workerId: "2", images: [] },
        startDate: new Date("2020-01-01"),
        endDate: new Date("2026-01-02"),
      },
    ),
  ).rejects.toThrowError("Start date must be in the future");
});

test("create reservation with invalid end date", async () => {
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

  await expect(
    createReservation(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      {
        formData: { description: "description", workerId: "2", images: [] },
        startDate: new Date("2026-01-02"),
        endDate: new Date("2026-01-01"),
      },
    ),
  ).rejects.toThrowError("Start date must be before end date");
});

test("create reservation with reserved worker", async () => {
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

  await prisma.reservation.create({
    data: {
      customerId: "1",
      workerId: "2",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-01-02"),
      status: "RESERVED",
      description: "description",
    },
  });

  await expect(
    createReservation(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      {
        formData: { description: "description", workerId: "2", images: [] },
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-01-02"),
      },
    ),
  ).rejects.toThrowError("Worker is already reserved in this time period");
});

test("create reservation with invalid role", async () => {
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

  await expect(
    createReservation(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      {
        formData: { description: "description", workerId: "2", images: [] },
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-01-02"),
      },
    ),
  ).rejects.toThrowError("Unauthorized");
});

test("create reservation with invalid worker", async () => {
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

  await expect(
    createReservation(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      {
        formData: { description: "description", workerId: "3", images: [] },
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-01-02"),
      },
    ),
  ).rejects.toThrowError("Worker not found");
});
