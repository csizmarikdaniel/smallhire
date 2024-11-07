import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import removeImage from "../remove-image";

test("should remove image", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email@email.com",
      password: "password",
      role: "CUSTOMER",
      address: "address",
      phone: "phone",
      name: "name",
      city: "city",
      zipCode: "zipCode",
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
      email: "email2@emąil.com",
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

  await prisma.image.create({
    data: {
      id: "1",
      reservationId: "1",
      userId: "1",
      url: "url",
    },
  });

  const data = await removeImage(
    prisma,
    { user: { id: "1", role: "CUSTOMER" } },
    { imageId: "1", reservationId: "1" },
  );

  expect(data.success).toEqual(true);

  const image = await prisma.image.findFirst({
    where: {
      id: "1",
    },
  });
  expect(image).toBeNull();

  const user = await prisma.user.findFirst({
    where: {
      id: "1",
    },
    include: {
      images: {
        where: {
          id: "1",
        },
      },
    },
  });

  expect(user?.images).toHaveLength(0);
});

test("should return error if image does not exist", async () => {
  await expect(
    removeImage(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { imageId: "1", reservationId: "1" },
    ),
  ).rejects.toThrowError();
});

test("should return error if image does not belong to user", async () => {
  await prisma.image.create({
    data: {
      id: "1",
      reservationId: "1",
      userId: "2",
      url: "url",
    },
  });

  await expect(
    removeImage(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { imageId: "1", reservationId: "1" },
    ),
  ).rejects.toThrowError();
});
