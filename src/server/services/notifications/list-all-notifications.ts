import { type SessionType } from "@/types";
import { type PrismaClient } from "@prisma/client";

const listAllNotifications = async (db: PrismaClient, session: SessionType) => {
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
