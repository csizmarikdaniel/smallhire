import { expect, test } from "vitest";
import editTrade from "../edit-trade";
import { prisma } from "@/test/setup-db";

test("should edit trade as worker", async () => {
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

  const data = await editTrade(prisma, {
    id: trade.id,
    name: "new name",
    pricePerHour: 20,
    yearsOfExperience: 10,
  });

  expect(data.name).toEqual("new name");
  expect(data.pricePerHour).toEqual(20);
  expect(data.yearsOfExperience).toEqual(10);

  const editedTrade = await prisma.trade.findUnique({
    where: {
      id: trade.id,
    },
  });

  expect(editedTrade?.name).toEqual("new name");
  expect(editedTrade?.pricePerHour).toEqual(20);
  expect(editedTrade?.yearsOfExperience).toEqual(10);
});
