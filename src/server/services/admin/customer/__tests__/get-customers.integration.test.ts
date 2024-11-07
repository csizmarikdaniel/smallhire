import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getCustomers from "../get-customers";

test("should get all customers", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email1@email.com",
      password: "password",
      role: "CUSTOMER",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  await prisma.customer.create({
    data: {
      userId: "1",
    },
  });

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
      password: "password",
      role: "CUSTOMER",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  await prisma.customer.create({
    data: {
      userId: "2",
    },
  });

  const data = await getCustomers(prisma, {});

  expect(data.customers.length).toEqual(2);
  expect(data.fullListLength).toEqual(2);
  expect(data.customers[0]?.id).toEqual("1");
  expect(data.customers[0]?.email).toEqual("email1@email.com");
  expect(data.customers[0]?.role).toEqual("CUSTOMER");
  expect(data.customers[0]?.address).toEqual("address1");
  expect(data.customers[0]?.phone).toEqual("phone1");
  expect(data.customers[0]?.name).toEqual("name1");
  expect(data.customers[0]?.city).toEqual("city1");
  expect(data.customers[0]?.zipCode).toEqual("zipCode1");

  expect(data.customers[1]?.id).toEqual("2");
  expect(data.customers[1]?.email).toEqual("email2@email.com");
  expect(data.customers[1]?.role).toEqual("CUSTOMER");
  expect(data.customers[1]?.address).toEqual("address1");
  expect(data.customers[1]?.phone).toEqual("phone1");
  expect(data.customers[1]?.name).toEqual("name1");
  expect(data.customers[1]?.city).toEqual("city1");
  expect(data.customers[1]?.zipCode).toEqual("zipCode1");
});

test("should get all customers with pagination", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email1@email.com",
      password: "password",
      role: "CUSTOMER",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  await prisma.customer.create({
    data: {
      userId: "1",
    },
  });

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
      password: "password",
      role: "CUSTOMER",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  await prisma.customer.create({
    data: {
      userId: "2",
    },
  });

  const data = await getCustomers(prisma, { limit: 1, page: 1 });

  expect(data.customers.length).toEqual(1);
  expect(data.fullListLength).toEqual(2);
  expect(data.customers[0]?.id).toEqual("1");
  expect(data.customers[0]?.email).toEqual("email1@email.com");
  expect(data.customers[0]?.role).toEqual("CUSTOMER");
  expect(data.customers[0]?.address).toEqual("address1");
  expect(data.customers[0]?.phone).toEqual("phone1");
  expect(data.customers[0]?.name).toEqual("name1");
  expect(data.customers[0]?.city).toEqual("city1");
  expect(data.customers[0]?.zipCode).toEqual("zipCode1");
});

test("should get all customers with search", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email1@email.com",
      password: "password",
      role: "CUSTOMER",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  await prisma.customer.create({
    data: {
      userId: "1",
    },
  });

  await prisma.user.create({
    data: {
      id: "2",
      email: "email2@email.com",
      password: "password",
      role: "CUSTOMER",
      address: "address1",
      phone: "phone1",
      name: "name2",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  await prisma.customer.create({
    data: {
      userId: "2",
    },
  });

  const data = await getCustomers(prisma, { search: "name1" });

  expect(data.customers.length).toEqual(1);
  expect(data.fullListLength).toEqual(1);
  expect(data.customers[0]?.id).toEqual("1");
  expect(data.customers[0]?.email).toEqual("email1@email.com");
  expect(data.customers[0]?.role).toEqual("CUSTOMER");
  expect(data.customers[0]?.address).toEqual("address1");
  expect(data.customers[0]?.phone).toEqual("phone1");
  expect(data.customers[0]?.name).toEqual("name1");
  expect(data.customers[0]?.city).toEqual("city1");
  expect(data.customers[0]?.zipCode).toEqual("zipCode1");
});
