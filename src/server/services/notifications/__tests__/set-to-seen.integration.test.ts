import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import setToSeen from "../set-to-seen";

test("should set a notification to seen", async () => {
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

  const notification = await prisma.notification.create({
    data: {
      title: "title1",
      description: "description1",
      userId: "1",
    },
  });

  expect(notification.seen).toEqual(false);

  const data = await setToSeen(prisma, {
    notificationId: notification.id,
  });

  expect(data.seen).toEqual(true);

  const updatedNotification = await prisma.notification.findUnique({
    where: {
      id: notification.id,
    },
  });

  expect(updatedNotification?.seen).toEqual(true);
});

test("should throw an error if notification does not exist", async () => {
  await expect(setToSeen(prisma, { notificationId: "1" })).rejects.toThrow(
    "Notification not found",
  );
});
