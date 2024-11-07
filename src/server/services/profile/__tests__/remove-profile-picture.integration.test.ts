import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import removeProfilePicture from "../remove-profile-picture";

test("should remove profile picture", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email@email.com",
      password: "password",
      role: "WORKER",
      address: "address",
      phone: "phone",
      name: "name",
      city: "city",
      zipCode: "zipCode",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "1",
    },
  });

  await prisma.image.create({
    data: {
      id: "1",
      userId: "1",
      url: "url",
      profileImage: true,
    },
  });

  const data = await removeProfilePicture(prisma, {
    user: {
      id: "1",
      role: "WORKER",
    },
  });

  expect(data.success).toEqual(true);

  const image = await prisma.image.findUnique({
    where: {
      id: "1",
    },
  });

  expect(image).toBeNull();

  const user = await prisma.user.findUnique({
    where: {
      id: "1",
    },
    include: {
      images: {
        where: {
          profileImage: true,
        },
      },
    },
  });

  expect(user?.images).toEqual([]);
});

test("should return success if user has no profile picture", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email@email.com",
      password: "password",
      role: "WORKER",
      address: "address",
      phone: "phone",
      name: "name",
      city: "city",
      zipCode: "zipCode",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "1",
    },
  });

  const data = await removeProfilePicture(prisma, {
    user: {
      id: "1",
      role: "WORKER",
    },
  });

  expect(data.success).toEqual(true);
});
