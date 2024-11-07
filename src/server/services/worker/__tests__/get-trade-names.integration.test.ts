import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getTradeNames from "../get-trade-names";

test("should get trade names", async () => {
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

  await prisma.trade.create({
    data: {
      name: "name",
      pricePerHour: 10,
      yearsOfExperience: 5,
      workerId: "1",
    },
  });

  await prisma.trade.create({
    data: {
      name: "name2",
      pricePerHour: 20,
      yearsOfExperience: 10,
      workerId: "1",
    },
  });

  const data = await getTradeNames(prisma);

  expect(data).toHaveLength(2);
  expect(data[0]?.name).toEqual("name");
  expect(data[1]?.name).toEqual("name2");
});
