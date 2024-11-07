import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import removeReferenceImage from "../remove-reference-image";

test("should remove reference image as worker", async () => {
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

  await prisma.reference.create({
    data: {
      id: "1",
      description: "description",
      workerId: "1",
    },
  });

  await prisma.image.create({
    data: {
      id: "1",
      referenceId: "1",
      url: "url",
    },
  });

  const data = await removeReferenceImage(
    prisma,
    { user: { id: "1", role: "WORKER" } },
    { referenceId: "1", imageId: "1" },
  );

  expect(data).toEqual({ success: true });

  const reference = await prisma.reference.findUnique({
    where: {
      id: "1",
    },
    include: {
      image: true,
    },
  });

  expect(reference?.image).toEqual([]);

  const image = await prisma.image.findUnique({
    where: {
      id: "1",
    },
  });

  expect(image).toBeNull();
});

test("should not remove reference image as customer", async () => {
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
    removeReferenceImage(
      prisma,
      { user: { id: "1", role: "CUSTOMER" } },
      { referenceId: "1", imageId: "1" },
    ),
  ).rejects.toThrow("Unauthorized");
});

test("should not remove reference image as worker without reference", async () => {
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

  await expect(
    removeReferenceImage(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      { referenceId: "1", imageId: "1" },
    ),
  ).rejects.toThrow("Reference not found");
});

test("should not remove reference image as worker without image", async () => {
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

  await prisma.reference.create({
    data: {
      id: "1",
      description: "description",
      workerId: "1",
    },
  });

  await expect(
    removeReferenceImage(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      { referenceId: "1", imageId: "1" },
    ),
  ).rejects.toThrow("Image not found");
});

test("should not remove if reference does not belong to worker", async () => {
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

  await prisma.reference.create({
    data: {
      id: "1",
      description: "description",
      workerId: "2",
    },
  });

  await expect(
    removeReferenceImage(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      { referenceId: "1", imageId: "1" },
    ),
  ).rejects.toThrow("Unauthorized");
});
