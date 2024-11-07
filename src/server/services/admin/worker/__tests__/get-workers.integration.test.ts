import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getWorkers from "../get-workers";

test("should get all workers", async () => {
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

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
      password: "password",
      role: "WORKER",
      address: "address2",
      phone: "phone2",
      name: "name2",
      city: "city2",
      zipCode: "zipCode2",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "1",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "2",
    },
  });

  const workers = await getWorkers(prisma, {});
  expect(workers.fullListLength).toEqual(2);
  expect(workers.workers[0]?.email).toEqual("email1@email.com");
  expect(workers.workers[1]?.email).toEqual("email2@email.com");
});

test("should get all workers with pagination", async () => {
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

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
      password: "password",
      role: "WORKER",
      address: "address2",
      phone: "phone2",
      name: "name2",
      city: "city2",
      zipCode: "zipCode2",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "1",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "2",
    },
  });

  const workers = await getWorkers(prisma, { limit: 1, page: 1 });

  expect(workers.fullListLength).toEqual(2);
  expect(workers.workers.length).toEqual(1);
  expect(workers.workers[0]?.email).toEqual("email1@email.com");
});

test("should get all workers with search", async () => {
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

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
      password: "password",
      role: "WORKER",
      address: "address2",
      phone: "phone2",
      name: "name2",
      city: "city2",
      zipCode: "zipCode2",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "1",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "2",
    },
  });

  const workers = await getWorkers(prisma, { search: "name2" });
  expect(workers.fullListLength).toEqual(1);
  expect(workers.workers[0]?.email).toEqual("email2@email.com");
});

test("should get all workers with trades filter", async () => {
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

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
      password: "password",
      role: "WORKER",
      address: "address2",
      phone: "phone2",
      name: "name2",
      city: "city2",
      zipCode: "zipCode2",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "1",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "2",
    },
  });

  await prisma.trade.create({
    data: {
      id: "1",
      name: "trade1",
      pricePerHour: 10,
      yearsOfExperience: 1,
      workerId: "1",
    },
  });

  await prisma.trade.create({
    data: {
      id: "2",
      name: "trade2",
      pricePerHour: 10,
      yearsOfExperience: 1,
      workerId: "2",
    },
  });

  const workers = await getWorkers(prisma, { trades: ["trade1"] });

  expect(workers.fullListLength).toEqual(1);
  expect(workers.workers[0]?.email).toEqual("email1@email.com");
});
