import { type PrismaClient } from "@prisma/client";

const setToSeen = async (
  db: PrismaClient,
  input: { notificationId: string },
) => {
  const notification = await db.notification.findUnique({
    where: {
      id: input.notificationId,
    },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  await db.notification.update({
    where: {
      id: input.notificationId,
    },
    data: {
      seen: true,
    },
  });
};

export default setToSeen;
