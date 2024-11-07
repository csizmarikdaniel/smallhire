import { expect, test } from "vitest";
import addWorker from "../add-worker";
import { prisma } from "@/test/setup-db";

test("should create worker", async () => {
  const data = await addWorker(prisma, {
    email: "email1@email.com",
    password: "password",
    address: "address1",
    phone: "phone1",
    name: "name1",
    city: "city1",
    zipCode: "zipCode1",
  });

  expect(data.email).toEqual("email1@email.com");
  expect(data.role).toEqual("WORKER");
  expect(data.address).toEqual("address1");
  expect(data.phone).toEqual("phone1");
  expect(data.name).toEqual("name1");
  expect(data.city).toEqual("city1");
  expect(data.zipCode).toEqual("zipCode1");

  const worker = await prisma.worker.findUnique({
    where: {
      userId: data.id,
    },
    include: {
      user: true,
    },
  });

  expect(worker?.user.email).toEqual("email1@email.com");
  expect(worker?.user.role).toEqual("WORKER");
  expect(worker?.user.address).toEqual("address1");
  expect(worker?.user.phone).toEqual("phone1");
  expect(worker?.user.name).toEqual("name1");
  expect(worker?.user.city).toEqual("city1");
  expect(worker?.user.zipCode).toEqual("zipCode1");
});

test("should throw error if user already exists", async () => {
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

  await expect(
    addWorker(prisma, {
      email: "email1@email.com",
      password: "password",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    }),
  ).rejects.toThrowError("User already exists");
});
