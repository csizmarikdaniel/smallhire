import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import listAllNotifications from "../list-all-notifications";

test("should list all notifications", async () => {
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

  await prisma.notification.create({
    data: {
      title: "title1",
      description: "description1",
      userId: "1",
      createdAt: new Date("2021-01-01"),
    },
  });
  await prisma.notification.create({
    data: {
      title: "title2",
      description: "description2",
      userId: "1",
      createdAt: new Date("2021-01-02"),
    },
  });

  const data = await listAllNotifications(prisma, {
    user: { id: "1", role: "WORKER" },
  });

  expect(data.length).toEqual(2);

  expect(data[0]?.title).toEqual("title2");
  expect(data[0]?.description).toEqual("description2");

  expect(data[1]?.title).toEqual("title1");
  expect(data[1]?.description).toEqual("description1");
});
