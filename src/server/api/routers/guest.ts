import listPublicWorkerData from "@/server/services/guest/list-public-worker-data";
import { publicProcedure, router } from "../trpc";
import getPublicWorkerData from "@/server/services/guest/get-public-worker-data";
import { getUserByIdSchema } from "@/types/guest";
import { z } from "zod";
import getTrades from "@/server/services/guest/get-trades";
import getNumberOfPages from "@/server/services/guest/get-number-of-pages";

const guestRouter = router({
  worker: router({
    list: publicProcedure
      .input(
        z
          .object({
            search: z.string().optional(),
            trades: z.array(z.string()).optional(),
            sort: z.string().optional(),
            page: z.number().optional(),
            limit: z.number().optional(),
          })
          .optional(),
      )
      .query(
        async ({ ctx, input }) =>
          await listPublicWorkerData(ctx.db, input ?? {}),
      ),
    get: publicProcedure
      .input(getUserByIdSchema)
      .query(
        async ({ ctx, input }) => await getPublicWorkerData(ctx.db, input),
      ),
  }),
  trades: publicProcedure.query(async ({ ctx }) => await getTrades(ctx.db)),
  numberOfPages: publicProcedure
    .input(
      z
        .object({
          pageSize: z.number(),
          search: z.string().optional(),
          trades: z.array(z.string()).optional(),
        })
        .optional(),
    )
    .query(
      async ({ ctx, input }) => await getNumberOfPages(ctx.db, input ?? {}),
    ),
});

export default guestRouter;
