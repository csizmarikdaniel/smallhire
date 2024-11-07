import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getReference from "../get-reference";

test("should get reference", async () => {
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

  const data = await getReference(prisma, {
    referenceId: "1",
  });

  expect(data?.description).toEqual("description");
  expect(data?.id).toEqual("1");
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

  expect(
    await getReference(prisma, {
      referenceId: "2",
    }),
  ).toEqual(null);
});
