import { type NotificationIdInput } from "@/types/notification";
import { type PrismaClient } from "@prisma/client";

const deleteNotification = async (
  db: PrismaClient,
  input: NotificationIdInput,
) => {
  const notification = await db.notification.findUnique({
    where: {
      id: input.notificationId,
    },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }
  await db.notification.delete({
    where: {
      id: input.notificationId,
    },
  });

  return;
};

export default deleteNotification;
