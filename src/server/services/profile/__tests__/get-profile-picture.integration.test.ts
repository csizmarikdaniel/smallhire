import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getProfilePicture from "../get-profile-picture";

test("should get profile picture", async () => {
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

  const data = await getProfilePicture(prisma, {
    user: {
      id: "1",
      role: "WORKER",
    },
  });

  expect(data).not.toBeNull();

  expect(data?.url).toEqual("url");
});

test("should return null if user is not found", async () => {
  const data = await getProfilePicture(prisma, {
    user: {
      id: "1",
      role: "WORKER",
    },
  });

  expect(data).toBeNull();
});

test("should return null if user has no profile picture", async () => {
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
    },
  });

  const data = await getProfilePicture(prisma, {
    user: {
      id: "1",
      role: "WORKER",
    },
  });

  expect(data).toBeNull();
});
