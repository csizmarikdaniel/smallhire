import listPublicWorkerData from "@/server/services/guest/list-public-worker-data";
import { publicProcedure, router } from "../trpc";
import getPublicWorkerData from "@/server/services/guest/get-public-worker-data";
import { GetUserByIdSchema, ListWorkersSchema } from "@/types/guest";
import getTrades from "@/server/services/guest/get-trades";

const guestRouter = router({
  worker: router({
    list: publicProcedure
      .input(ListWorkersSchema)
      .query(
        async ({ ctx, input }) =>
          await listPublicWorkerData(ctx.db, input ?? {}),
      ),
    get: publicProcedure
      .input(GetUserByIdSchema)
      .query(
        async ({ ctx, input }) => await getPublicWorkerData(ctx.db, input),
      ),
  }),
  trades: publicProcedure.query(async ({ ctx }) => await getTrades(ctx.db)),
});

export default guestRouter;
