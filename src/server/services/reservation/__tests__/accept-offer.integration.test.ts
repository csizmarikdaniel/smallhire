import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import acceptOffer from "../accept-offer";

test("should accept offer", async () => {
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
      status: "CREATEDOFFER",
      description: "description",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-01-02"),
    },
  });

  const data = await acceptOffer(
    prisma,
    {
      user: { id: "1", role: "CUSTOMER" },
    },
    { reservationId: "1" },
  );

  expect(data.success).toEqual(true);

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: "1",
    },
  });

  expect(reservation?.status).toEqual("ACCEPTEDOFFER");

  const notification = await prisma.notification.findFirst({
    where: {
      reservationId: "1",
    },
  });

  expect(notification?.title).toEqual("Árajánlat elfogadva");
  expect(notification?.description).toEqual(
    `Az árajánlat elfogadva a(z) ${new Date("2021-01-01").toLocaleDateString(
      "hu-HU",
    )} - ${new Date("2021-01-02").toLocaleDateString("hu-HU")} időszakra`,
  );
  expect(notification?.userId).toEqual("2");
});

test("should throw error if user is not customer", async () => {
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
      status: "CREATEDOFFER",
      description: "description",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-01-02"),
    },
  });

  await expect(
    acceptOffer(
      prisma,
      {
        user: { id: "1", role: "WORKER" },
      },
      { reservationId: "1" },
    ),
  ).rejects.toThrowError("Unauthorized");
});

test("should throw error if reservation not found", async () => {
  await expect(
    acceptOffer(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { reservationId: "1" },
    ),
  ).rejects.toThrowError("Reservation not found");
});

test("should throw error if reservation status is not CREATEDOFFER", async () => {
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

  await expect(
    acceptOffer(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { reservationId: "1" },
    ),
  ).rejects.toThrowError("Reservation is not in the correct status");
});
