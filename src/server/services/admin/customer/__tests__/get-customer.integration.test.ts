import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getCustomer from "../get-customer";

test("should get customer", async () => {
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

  const data = await getCustomer(prisma, { customerId: "1" });

  expect(data?.id).toEqual("1");
  expect(data?.email).toEqual("email1@email.com");
  expect(data?.role).toEqual("CUSTOMER");
  expect(data?.address).toEqual("address1");
  expect(data?.phone).toEqual("phone1");
  expect(data?.name).toEqual("name1");
  expect(data?.city).toEqual("city1");
  expect(data?.zipCode).toEqual("zipCode1");
});

test("should throw error if customer not found", async () => {
  await expect(getCustomer(prisma, { customerId: "1" })).rejects.toThrowError(
    "Customer not found",
  );
});
