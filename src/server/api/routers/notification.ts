import listAllNotifications from "@/server/services/notifications/list-all-notifications";
import { authProcedure, router } from "../trpc";
import setToSeen from "@/server/services/notifications/set-to-seen";
import deleteNotification from "@/server/services/notifications/delete-notification";
import { NotificationIdSchema } from "@/types/notification";
import unseenNotificationsCount from "@/server/services/notifications/unseen-notifications-count";

const notificationRouter = router({
  getAll: authProcedure.query(
    async ({ ctx }) => await listAllNotifications(ctx.db, ctx.session),
  ),
  setToSeen: authProcedure
    .input(NotificationIdSchema)
    .mutation(async ({ ctx, input }) => await setToSeen(ctx.db, input)),
  delete: authProcedure
    .input(NotificationIdSchema)
    .mutation(
      async ({ ctx, input }) => await deleteNotification(ctx.db, input),
    ),
  unseenNotificationsCount: authProcedure.query(
    async ({ ctx }) => await unseenNotificationsCount(ctx.db, ctx.session),
  ),
});

export default notificationRouter;
