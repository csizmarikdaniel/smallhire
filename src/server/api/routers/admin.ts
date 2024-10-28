import getAdmin from "@/server/services/admin/get-admin";
import { authProcedure, router } from "../trpc";

const adminRouter = router({
  get: authProcedure.query(async ({ ctx }) => await getAdmin(ctx.db)),
});

export default adminRouter;
