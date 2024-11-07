import { expect, test } from "vitest";
import getAdmin from "../get-admin";
import { prisma } from "@/test/setup-db";
import { mockAdminSession, mockCustomerSession } from "@/test/mock";

test("should return admin", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email@email.com",
      password: "password",
      role: "ADMIN",
      address: "address",
      phone: "phone",
      name: "name",
      city: "city",
      zipCode: "zipCode",
    },
  });

  const admin = await getAdmin(prisma, mockAdminSession);
  expect(admin.id).toEqual("1");
  expect(admin.email).toEqual("email@email.com");
  expect(admin.role).toEqual("ADMIN");
  expect(admin.address).toEqual("address");
  expect(admin.phone).toEqual("phone");
  expect(admin.name).toEqual("name");
  expect(admin.city).toEqual("city");
  expect(admin.zipCode).toEqual("zipCode");
});

test("should throw error if user is not admin", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email@email.com",
      password: "password",
      role: "ADMIN",
      address: "address",
      phone: "phone",
      name: "name",
      city: "city",
      zipCode: "zipCode",
    },
  });
  await expect(getAdmin(prisma, mockCustomerSession)).rejects.toThrowError();
});

test("should throw error if user is not found", async () => {
  await expect(getAdmin(prisma, mockAdminSession)).rejects.toThrowError();
});
