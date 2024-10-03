import listAllNotifications from "@/server/services/notifications/list-all-notifications";
import { authProcedure, router } from "../trpc";
import setToSeen from "@/server/services/notifications/set-to-seen";
import { z } from "zod";
import deleteNotification from "@/server/services/notifications/delete-notification";

const notificationRouter = router({
  getAll: authProcedure.query(
    async ({ ctx }) => await listAllNotifications(ctx.db),
  ),
  setToSeen: authProcedure
    .input(z.object({ notificationId: z.string() }))
    .mutation(async ({ ctx, input }) => await setToSeen(ctx.db, input)),
  delete: authProcedure
    .input(z.object({ notificationId: z.string() }))
    .mutation(
      async ({ ctx, input }) => await deleteNotification(ctx.db, input),
    ),
});

export default notificationRouter;
