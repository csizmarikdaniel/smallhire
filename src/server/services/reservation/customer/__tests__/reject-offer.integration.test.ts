import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import rejectOffer from "../reject-offer";

test("reject offer", async () => {
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
      status: "CREATEDOFFER",
    },
  });

  const data = await rejectOffer(
    prisma,
    { user: { id: "1", role: "CUSTOMER" } },
    { reservationId: reservation.id },
  );

  expect(data.success).toEqual(true);

  const updatedReservation = await prisma.reservation.findFirst({
    where: {
      id: reservation.id,
    },
  });

  expect(updatedReservation?.status).toEqual("REJECTEDOFFER");

  const notification = await prisma.notification.findFirst({
    where: {
      reservationId: reservation.id,
    },
  });

  expect(notification?.title).toEqual("Árajánlat elutasítva");
  expect(notification?.description).toEqual(
    `Az árajánlat el lett utasítva a(z) ${reservation.startDate.toLocaleDateString("hu-HU")} - ${reservation.endDate.toLocaleDateString("hu-HU")} időszakra a megrendelő által`,
  );
  expect(notification?.userId).toEqual("2");
});

test("should throw error if user is not a customer", async () => {
  await expect(
    rejectOffer(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      { reservationId: "1" },
    ),
  ).rejects.toThrowError("Unauthorized");
});

test("should throw error if reservation is not in the correct status", async () => {
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

  await expect(
    rejectOffer(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { reservationId: reservation.id },
    ),
  ).rejects.toThrowError("Reservation is not in the correct status");
});

test("should throw error if reservation is not found", async () => {
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
    rejectOffer(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { reservationId: "1" },
    ),
  ).rejects.toThrowError("Reservation not found");
});
