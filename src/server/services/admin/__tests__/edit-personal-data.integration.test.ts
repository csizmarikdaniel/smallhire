import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import editPersonalData from "../edit-personal-data";

test("should edit personal data", async () => {
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

  const data = await editPersonalData(prisma, {
    id: "1",
    email: "email1@email.com",
    address: "address1",
    phone: "phone1",
    name: "name1",
    city: "city1",
    zipCode: "zipCode1",
  });

  expect(data.id).toEqual("1");
  expect(data.email).toEqual("email1@email.com");
  expect(data.address).toEqual("address1");
  expect(data.phone).toEqual("phone1");
  expect(data.name).toEqual("name1");
  expect(data.city).toEqual("city1");
  expect(data.zipCode).toEqual("zipCode1");
});

test("should throw error if user is not found", async () => {
  await expect(
    editPersonalData(prisma, {
      id: "1",
      email: "email1@email.com",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    }),
  ).rejects.toThrowError();
});
