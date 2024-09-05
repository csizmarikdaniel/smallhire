import { authProcedure, router } from "@/server/api/trpc";
import getTrades from "@/server/services/worker/get-trades";

const workerRouter = router({
  trades: router({
    list: authProcedure.query(async ({ ctx }) => getTrades(ctx.db)),
  }),
});

export default workerRouter;
