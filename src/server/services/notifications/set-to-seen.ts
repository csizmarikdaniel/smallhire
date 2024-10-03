import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const setToSeen = async (
  db: PrismaClient,
  input: { notificationId: string },
) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const notification = await db.notification.findUnique({
    where: {
      id: input.notificationId,
    },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  if (notification.userId !== session.user.id) {
    throw new Error("Unauthorized");
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
