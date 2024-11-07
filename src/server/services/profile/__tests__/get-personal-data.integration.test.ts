import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getPersonalData from "../get-personal-data";

test("should get personal data", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email@email.com",
      password: "password",
      role: "WORKER",
      address: "address",
      phone: "phone",
      name: "name",
      city: "city",
      zipCode: "zipCode",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "1",
    },
  });

  const data = await getPersonalData(prisma, {
    user: {
      id: "1",
      role: "WORKER",
    },
  });

  expect(data).not.toBeNull();
  expect(data?.name).toEqual("name");
  expect(data?.address).toEqual("address");
  expect(data?.phone).toEqual("phone");
  expect(data?.city).toEqual("city");
  expect(data?.zipCode).toEqual("zipCode");
});

test("should return null if user is not found", async () => {
  const data = await getPersonalData(prisma, {
    user: {
      id: "1",
      role: "WORKER",
    },
  });

  expect(data).toBeNull();
});
