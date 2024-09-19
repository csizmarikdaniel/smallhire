import getWorkerReservedDays from "@/server/services/customer/get-worker-reserved-days";
import { authProcedure, router } from "../trpc";
import { z } from "zod";

const customerRouter = router({
  worker: router({
    reserved: authProcedure
      .input(z.object({ workerId: z.string() }))
      .query(
        async ({ ctx, input }) =>
          await getWorkerReservedDays(ctx.db, input.workerId),
      ),
  }),
});

export default customerRouter;
