import listPublicWorkerData from "@/server/services/guest/list-public-worker-data";
import { publicProcedure, router } from "../trpc";
import getPublicWorkerData from "@/server/services/guest/get-public-worker-data";
import { getUserByIdSchema } from "@/types/guest";

const guestRouter = router({
  worker: router({
    list: publicProcedure.query(
      async ({ ctx }) => await listPublicWorkerData(ctx.db),
    ),
    get: publicProcedure
      .input(getUserByIdSchema)
      .query(
        async ({ ctx, input }) => await getPublicWorkerData(ctx.db, input),
      ),
  }),
});

export default guestRouter;
