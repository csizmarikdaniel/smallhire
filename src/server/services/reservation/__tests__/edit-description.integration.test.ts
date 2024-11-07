import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import editDescription from "../edit-description";

test("should edit reservation description", async () => {
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

  const data = await editDescription(
    prisma,
    { user: { id: "1", role: "CUSTOMER" } },
    { reservationId: reservation.id, description: "new description" },
  );

  expect(data).toEqual({ success: true });

  const updatedReservation = await prisma.reservation.findFirst({
    where: {
      id: reservation.id,
    },
  });

  expect(updatedReservation?.description).toBe("new description");

  const notification = await prisma.notification.findFirst({
    where: {
      reservationId: reservation.id,
    },
  });

  expect(notification?.title).toBe("Leírás módosítás");
  expect(notification?.description).toBe(
    "A leírás módosítva lett a foglaláshoz",
  );
  expect(notification?.userId).toBe("2");
});

test("should throw error if reservation not found", async () => {
  await expect(
    editDescription(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { reservationId: "1", description: "new description" },
    ),
  ).rejects.toThrow("Reservation not found");
});
