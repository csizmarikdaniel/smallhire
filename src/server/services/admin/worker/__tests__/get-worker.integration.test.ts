import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getWorker from "../get-worker";

test("should get worker", async () => {
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

  const worker = await getWorker(prisma, {
    workerId: "1",
  });

  expect(worker.email).toEqual("email1@email.com");
});

test("should throw error if worker does not exist", async () => {
  await expect(
    getWorker(prisma, {
      workerId: "1",
    }),
  ).rejects.toThrowError("Worker with id 1 not found");
});
