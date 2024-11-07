import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import addReference from "../add-reference";

test("should add reference", async () => {
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
  const data = await addReference(prisma, {
    workerId: "1",
    formData: { description: "description", images: [] },
  });

  expect(data.description).toEqual("description");
  expect(data.workerId).toEqual("1");

  const reference = await prisma.reference.findUnique({
    where: {
      id: data.id,
    },
  });

  expect(reference?.description).toEqual("description");
  expect(reference?.workerId).toEqual("1");
});

test("should throw error if worker not found", async () => {
  await expect(
    addReference(prisma, {
      workerId: "1",
      formData: { description: "description", images: [] },
    }),
  ).rejects.toThrowError("Worker not found");
});

test("should throw error if invalid file type", async () => {
  //TODO
});

test("should create reference with image", async () => {
  //TODO
});
