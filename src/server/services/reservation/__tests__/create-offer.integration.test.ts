import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import createOffer from "../create-offer";

test("should create offer", async () => {
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

  const data = await createOffer(
    prisma,
    { user: { id: "2", role: "WORKER" } },
    { reservationId: reservation.id, price: 100 },
  );

  expect(data).toEqual({ success: true });

  const updatedReservation = await prisma.reservation.findFirst({
    where: {
      id: reservation.id,
    },
  });

  expect(updatedReservation?.status).toEqual("CREATEDOFFER");
  expect(updatedReservation?.price).toEqual(100);

  const notification = await prisma.notification.findFirst({
    where: {
      reservationId: reservation.id,
    },
  });

  expect(notification?.title).toEqual("Árajánlat");
  expect(notification?.description).toEqual(
    `Az árajánlat elkészült a(z) ${reservation.startDate.toLocaleDateString(
      "hu-HU",
    )} - ${reservation.endDate.toLocaleDateString("hu-HU")} időszakra`,
  );
  expect(notification?.userId).toEqual("1");
});

test("should not create offer if not worker", async () => {
  await expect(
    createOffer(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { reservationId: "1", price: 100 },
    ),
  ).rejects.toThrow("Unauthorized");
});

test("should not create offer if reservation not found", async () => {
  await expect(
    createOffer(
      prisma,
      { user: { id: "2", role: "WORKER" } },
      { reservationId: "1", price: 100 },
    ),
  ).rejects.toThrow("Reservation not found");
});

test("should not create offer if reservation status is not RESERVED", async () => {
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
      status: "ACCEPTEDOFFER",
    },
  });

  await expect(
    createOffer(
      prisma,
      { user: { id: "2", role: "WORKER" } },
      { reservationId: reservation.id, price: 100 },
    ),
  ).rejects.toThrow("Reservation is not in the correct status");
});
