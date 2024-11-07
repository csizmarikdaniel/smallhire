import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import unseenNotificationsCount from "../unseen-notifications-count";

test("should return the number of unseen notifications", async () => {
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
    },
  });

  await prisma.notification.create({
    data: {
      title: "title2",
      description: "description2",
      userId: "1",
    },
  });

  await prisma.notification.create({
    data: {
      title: "title3",
      description: "description3",
      userId: "1",
      seen: true,
    },
  });

  const data = await unseenNotificationsCount(prisma, {
    user: { id: "1", role: "WOKRER" },
  });

  expect(data).toEqual(2);
});
