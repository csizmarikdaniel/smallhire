import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import addCustomer from "../add-customer";

test("should add customer", async () => {
  const data = await addCustomer(prisma, {
    email: "email1@email.com",
    password: "password",
    address: "address1",
    phone: "phone1",
    name: "name1",
    city: "city1",
    zipCode: "zipCode1",
  });

  expect(data.email).toEqual("email1@email.com");
  expect(data.address).toEqual("address1");
  expect(data.phone).toEqual("phone1");
  expect(data.name).toEqual("name1");
  expect(data.city).toEqual("city1");
  expect(data.zipCode).toEqual("zipCode1");
  expect(data.role).toEqual("CUSTOMER");

  const customer = await prisma.customer.findFirst({
    where: {
      userId: data.id,
    },
    include: {
      user: true,
    },
  });

  expect(customer?.user.id).toEqual(data.id);
  expect(customer?.user.email).toEqual(data.email);
  expect(customer?.user.role).toEqual(data.role);
  expect(customer?.user.address).toEqual(data.address);
  expect(customer?.user.phone).toEqual(data.phone);
  expect(customer?.user.name).toEqual(data.name);
  expect(customer?.user.city).toEqual(data.city);
});

test("should throw error if user exists", async () => {
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

  await expect(
    addCustomer(prisma, {
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
