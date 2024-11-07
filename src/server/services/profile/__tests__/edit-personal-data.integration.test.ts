import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import editPersonalData from "../edit-personal-data";

test("should edit personal data", async () => {
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

  const data = await editPersonalData(
    prisma,
    {
      user: {
        id: "1",
        role: "WORKER",
      },
    },
    {
      name: "new name",
      id: "1",
      address: "new address",
      phone: "new phone",
      city: "new city",
      zipCode: "new zipCode",
    },
  );

  expect(data.name).toEqual("new name");
  expect(data.address).toEqual("new address");
  expect(data.phone).toEqual("new phone");
  expect(data.city).toEqual("new city");
  expect(data.zipCode).toEqual("new zipCode");

  const updatedUser = await prisma.user.findUnique({
    where: {
      id: "1",
    },
  });

  expect(updatedUser?.name).toEqual(data.name);
  expect(updatedUser?.address).toEqual(data.address);
  expect(updatedUser?.phone).toEqual(data.phone);
  expect(updatedUser?.city).toEqual(data.city);
  expect(updatedUser?.zipCode).toEqual(data.zipCode);
});

test("should throw an error if user does not exist", async () => {
  await expect(
    editPersonalData(
      prisma,
      { user: { id: "1", role: "WORKER" } },
      {
        name: "new name",
        id: "1",
        address: "new address",
        phone: "new phone",
        city: "new city",
        zipCode: "new zipCode",
      },
    ),
  ).rejects.toThrow("User not found");
});
