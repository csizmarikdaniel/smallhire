import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const listAllNotifications = async (db: PrismaClient) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const notifications = db.notification.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notifications;
};

export default listAllNotifications;
