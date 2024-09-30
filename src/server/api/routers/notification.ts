import listAllNotifications from "@/server/services/notifications/list-all-notifications";
import { authProcedure, router } from "../trpc";

const notificationRouter = router({
  getAll: authProcedure.query(
    async ({ ctx }) => await listAllNotifications(ctx.db),
  ),
});

export default notificationRouter;
