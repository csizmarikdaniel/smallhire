import getWorkerReservations from "@/server/services/customer/get-worker-reservations";
import { authProcedure, router } from "../trpc";
import { z } from "zod";

const customerRouter = router({
  worker: router({
    reservation: router({
      list: authProcedure
        .input(z.object({ workerId: z.string() }))
        .query(
          async ({ ctx, input }) =>
            await getWorkerReservations(ctx.db, input.workerId),
        ),
    }),
  }),
});

export default customerRouter;
