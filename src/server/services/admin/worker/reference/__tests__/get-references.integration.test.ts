import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import getReferences from "../get-references";

test("should get all references", async () => {
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

  await prisma.reference.create({
    data: {
      id: "1",
      workerId: "1",
      description: "description",
    },
  });

  await prisma.reference.create({
    data: {
      id: "2",
      workerId: "1",
      description: "description",
    },
  });

  const data = await getReferences(prisma, {
    workerId: "1",
  });

  expect(data.length).toEqual(2);
  expect(data[0]?.id).toEqual("1");
  expect(data[1]?.id).toEqual("2");
});
