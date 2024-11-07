import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import deleteWorker from "../delete-worker";

test("should delete worker", async () => {
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

  await deleteWorker(prisma, {
    workerId: "1",
  });

  expect(await prisma.user.findMany({ where: { role: "WORKER" } })).toEqual([]);
});
