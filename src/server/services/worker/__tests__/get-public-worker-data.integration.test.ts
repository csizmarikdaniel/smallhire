import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getPublicWorkerData from "../get-public-worker-data";

test("should get public worker data", async () => {
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

  const reference = await prisma.reference.create({
    data: {
      description: "description",
      workerId: "1",
    },
  });

  const data = await getPublicWorkerData(prisma, { workerId: "1" });

  expect(data).toEqual({
    id: "1",
    name: "name1",
    address: "address1",
    city: "city1",
    zipCode: "zipCode1",
    images: [],
    worker: {
      trades: [
        {
          id: trade.id,
          name: "name",
          yearsOfExperience: 5,
          pricePerHour: 10,
        },
      ],
      references: [
        {
          id: reference.id,
          image: [],
          description: "description",
        },
      ],
    },
  });
});
