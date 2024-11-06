import getWorkerReservedDays from "@/server/services/customer/get-worker-reserved-days";
import { authProcedure, router } from "../trpc";
import { WorkerIdSchema } from "@/types";

const customerRouter = router({
  worker: router({
    reservedDays: authProcedure
      .input(WorkerIdSchema)
      .query(
        async ({ ctx, input }) => await getWorkerReservedDays(ctx.db, input),
      ),
  }),
});

export default customerRouter;
