import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import deleteNotification from "../delete-notification";

test("should delete a notification", async () => {
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

  const notification1 = await prisma.notification.create({
    data: {
      title: "title",
      description: "description",
      userId: "1",
    },
  });

  const notification2 = await prisma.notification.create({
    data: {
      title: "title",
      description: "description",
      userId: "1",
    },
  });

  await deleteNotification(prisma, { notificationId: notification1.id });

  const notifications = await prisma.user.findUnique({
    where: {
      id: "1",
    },
    select: {
      notifications: true,
    },
  });

  expect(notifications?.notifications.length).toEqual(1);
  expect(notifications?.notifications[0]?.id).toEqual(notification2.id);
  expect(notifications?.notifications[0]?.title).toEqual(notification2.title);
  expect(notifications?.notifications[0]?.description).toEqual(
    notification2.description,
  );
});

test("should throw an error if notification not found", async () => {
  await expect(
    deleteNotification(prisma, { notificationId: "1" }),
  ).rejects.toThrow("Notification not found");
});
