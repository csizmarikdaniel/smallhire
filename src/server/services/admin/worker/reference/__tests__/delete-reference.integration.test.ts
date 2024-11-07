import { prisma } from "@/test/setup-db";
import { expect, test, vi } from "vitest";
import deleteReference from "../delete-reference";

vi.mock("utapi.deleteFiles", vi.fn());

test("should delete reference", async () => {
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

  const data = await deleteReference(prisma, {
    referenceId: "1",
  });

  expect(data.success).toEqual(true);
  expect(await prisma.reference.findUnique({ where: { id: "1" } })).toEqual(
    null,
  );
});

test("should throw error if reference not found", async () => {
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

  await expect(deleteReference(prisma, { referenceId: "2" })).rejects.toThrow(
    "Reference not found",
  );
});

test("should delete reference with image", async () => {
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

  const data = await deleteReference(prisma, {
    referenceId: "1",
  });

  expect(data.success).toEqual(true);
  expect(await prisma.reference.findUnique({ where: { id: "1" } })).toEqual(
    null,
  );
  expect(await prisma.image.findUnique({ where: { id: "1" } })).toEqual(null);
});
