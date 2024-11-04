import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const listAllNotifications = async (db: PrismaClient) => {
  const session = await getSession();

  const notifications = await db.notification.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      seen: true,
      reservationId: true,
    },
  });

  return notifications;
};

export default listAllNotifications;
