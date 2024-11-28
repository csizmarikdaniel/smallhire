import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import rejectReservation from "../reject-reservation";

test("should reject reservation", async () => {
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

  const data = await rejectReservation(
    prisma,
    { user: { id: "2", role: "WORKER" } },
    { reservationId: reservation.id },
  );

  expect(data).toEqual({ success: true });

  const updatedReservation = await prisma.reservation.findFirst({
    where: {
      id: reservation.id,
    },
  });

  expect(updatedReservation?.status).toEqual("REJECTED");

  const notification = await prisma.notification.findFirst({
    where: {
      reservationId: reservation.id,
    },
  });

  expect(notification).toMatchObject({
    title: "Foglalás elutasítva",
    description: `A foglalás el lett utasítva a(z) ${reservation.startDate.toLocaleDateString("hu-HU")} - ${reservation.endDate.toLocaleDateString("hu-HU")} időszakra a munkavállaló által`,
    userId: "1",
  });
});

test("should throw error if user is not worker", async () => {
  await expect(
    rejectReservation(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { reservationId: "1" },
    ),
  ).rejects.toThrow("Unauthorized");
});

test("should throw error if reservation is not found", async () => {
  await expect(
    rejectReservation(
      prisma,
      { user: { id: "2", role: "WORKER" } },
      { reservationId: "1" },
    ),
  ).rejects.toThrow("Reservation not found");
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
      status: "CANCELLED",
    },
  });

  await expect(
    rejectReservation(
      prisma,
      { user: { id: "2", role: "WORKER" } },
      { reservationId: reservation.id },
    ),
  ).rejects.toThrow("Reservation is not in the correct status");
});
