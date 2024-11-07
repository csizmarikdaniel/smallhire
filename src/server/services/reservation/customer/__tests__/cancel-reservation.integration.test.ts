import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import cancelReservation from "../cancel-reservation";

test("cancel reservation", async () => {
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
      id: "1",
      customerId: "1",
      workerId: "2",
      status: "RESERVED",
      description: "description",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-01-02"),
    },
  });

  const data = await cancelReservation(
    prisma,
    { user: { id: "1", role: "CUSTOMER" } },
    {
      reservationId: "1",
    },
  );

  expect(data).toEqual({ success: true });

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: "1",
    },
  });

  expect(reservation?.status).toBe("CANCELLED");

  const notification = await prisma.notification.findFirst({
    where: {
      reservationId: "1",
    },
  });

  expect(notification?.title).toBe("Foglalás törölve");
  expect(notification?.description).toBe(
    `A foglalás törölve lett a(z) 2021. 01. 01. - 2021. 01. 02. időszakra a megrendelő által`,
  );
  expect(notification?.userId).toBe("2");
});

test("should throw error if user is not a customer", async () => {
  await expect(
    cancelReservation(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      { reservationId: "1" },
    ),
  ).rejects.toThrow("Unauthorized");
});

test("should throw error if reservation is not found", async () => {
  await expect(
    cancelReservation(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
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

  await prisma.reservation.create({
    data: {
      id: "1",
      customerId: "1",
      workerId: "2",
      status: "ACCEPTEDOFFER",
      description: "description",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-01-02"),
    },
  });

  await expect(
    cancelReservation(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { reservationId: "1" },
    ),
  ).rejects.toThrowError("Reservation cannot be cancelled");
});
