import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import editWorker from "../edit-worker";

test("should edit worker", async () => {
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

  await prisma.user.create({
    data: {
      id: "3",
      email: "email3@email.com",
      password: "password",
      role: "CUSTOMER",
      address: "address3",
      phone: "phone3",
      name: "name3",
      city: "city3",
      zipCode: "zipCode3",
    },
  });

  await prisma.customer.create({
    data: {
      userId: "3",
    },
  });

  const reservation = await prisma.reservation.create({
    data: {
      description: "description",
      endDate: new Date("2021-01-01"),
      startDate: new Date("2021-01-01"),
      status: "RESERVED",
      customerId: "3",
      workerId: "1",
    },
  });

  const data = await editWorker(prisma, {
    email: "email2@email.com",
    reservationId: reservation.id,
  });

  expect(data.success).toEqual(true);
});

test("should throw error if worker is not found", async () => {
  await expect(
    editWorker(prisma, {
      email: "email@email.com",
      reservationId: "1",
    }),
  ).rejects.toThrowError("Nem létezik ezzel az email címmel felhasználó.");
});

test("should throw error if email does not belong to a worker", async () => {
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

  await expect(
    editWorker(prisma, {
      email: "email1@email.com",
      reservationId: "1",
    }),
  ).rejects.toThrowError("A felhasználó nem szakember.");
});
