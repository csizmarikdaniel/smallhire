import { type SessionType } from "@/types";
import { type PrismaClient } from "@prisma/client";

const unseenNotificationsCount = async (
  db: PrismaClient,
  session: SessionType,
) => {
  const count = await db.notification.count({
    where: {
      userId: session?.user.id,
      seen: false,
    },
  });

  return count;
};

export default unseenNotificationsCount;
