import { expect, test, vi } from "vitest";
import deleteReferenceImage from "../delete-reference-image";
import { prisma } from "@/test/setup-db";

vi.mock("utapi.deleteFiles", vi.fn());

test("delete-reference-image", async () => {
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
      workerId: "1",
      description: "description",
    },
  });

  await prisma.image.create({
    data: {
      id: "1",
      referenceId: "1",
      url: "url",
    },
  });

  const reference = await deleteReferenceImage(prisma, {
    referenceId: "1",
    imageId: "1",
  });

  expect(await prisma.image.findUnique({ where: { id: "1" } })).toBeNull();
  expect(reference.description).toEqual("description");
  expect(reference.id).toEqual("1");
  expect(reference.workerId).toEqual("1");
});

test("delete-reference-image with invalid referenceId", async () => {
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
      workerId: "1",
      description: "description",
    },
  });

  await prisma.image.create({
    data: {
      id: "1",
      referenceId: "1",
      url: "url",
    },
  });

  await expect(
    deleteReferenceImage(prisma, {
      referenceId: "2",
      imageId: "1",
    }),
  ).rejects.toThrowError("Reference not found");
});

test("delete-reference-image with invalid imageId", async () => {
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
      workerId: "1",
      description: "description",
    },
  });

  await prisma.image.create({
    data: {
      id: "1",
      referenceId: "1",
      url: "url",
    },
  });

  await expect(
    deleteReferenceImage(prisma, {
      referenceId: "1",
      imageId: "2",
    }),
  ).rejects.toThrowError("Image not found");
});

test("delete-reference-image with image not belonging to reference", async () => {
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
      workerId: "1",
      description: "description",
    },
  });

  await prisma.image.create({
    data: {
      id: "1",
      referenceId: "1",
      url: "url",
    },
  });

  await prisma.reference.create({
    data: {
      id: "2",
      workerId: "1",
      description: "description",
    },
  });

  await expect(
    deleteReferenceImage(prisma, {
      referenceId: "2",
      imageId: "1",
    }),
  ).rejects.toThrowError("Image does not belong to reference");
});
