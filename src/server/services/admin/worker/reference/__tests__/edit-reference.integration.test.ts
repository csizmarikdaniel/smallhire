import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import editReference from "../edit-reference";

test("should edit reference", async () => {
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

  const data = await editReference(prisma, {
    referenceId: "1",
    description: "description2",
  });

  expect(data.description).toEqual("description2");
  expect(
    await prisma.reference.findUnique({
      where: { id: "1" },
      select: { id: true, workerId: true, description: true },
    }),
  ).toEqual({
    id: "1",
    workerId: "1",
    description: "description2",
  });
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

  await expect(
    editReference(prisma, {
      referenceId: "2",
      description: "description2",
    }),
  ).rejects.toThrowError("Reference not found");
});
