import { authProcedure, publicProcedure, router } from "@/server/api/trpc";
import getWorkerData from "@/server/services/worker/get-worker-data";

const workerRouter = router({
  profile: router({
    get: authProcedure.query(async ({ ctx }) => getWorkerData(ctx.db)),
  }),
});

export default workerRouter;
