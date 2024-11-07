import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import listPublicWorkerData from "../list-public-worker-data";

test("should list public worker data", async () => {
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

  const trade = await prisma.trade.create({
    data: {
      name: "name",
      pricePerHour: 10,
      yearsOfExperience: 5,
      workerId: "1",
    },
  });
  const data = await listPublicWorkerData(prisma, {});

  expect(data.workers).toHaveLength(1);

  expect(data.workers[0]?.address).toEqual("address1");
  expect(data.workers[0]?.city).toEqual("city1");
  expect(data.workers[0]?.zipCode).toEqual("zipCode1");
  expect(data.workers[0]?.name).toEqual("name1");
  expect(data.workers[0]?.trades).toHaveLength(1);
  expect(data.workers[0]?.trades).toEqual([
    {
      id: trade.id,
      name: "name",
    },
  ]);
});
