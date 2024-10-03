import { authProcedure, router } from "@/server/api/trpc";
import addTrade from "@/server/services/worker/add-trade";
import deleteTrade from "@/server/services/worker/delete-trade";
import editTrade from "@/server/services/worker/edit-trade";
import getTrade from "@/server/services/worker/get-trade";
import getTrades from "@/server/services/worker/get-trades";
import {
  AddTradeSchema,
  DeleteTradeSchema,
  EditTradeSchema,
} from "@/types/worker";
import { z } from "zod";

const workerRouter = router({
  trades: router({
    list: authProcedure.query(async ({ ctx }) => getTrades(ctx.db)),
    edit: authProcedure
      .input(EditTradeSchema)
      .mutation(async ({ ctx, input }) => editTrade(ctx.db, input)),
    delete: authProcedure
      .input(DeleteTradeSchema)
      .mutation(async ({ ctx, input }) => await deleteTrade(ctx.db, input)),
    get: authProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ ctx, input }) => await getTrade(ctx.db, input)),
    add: authProcedure
      .input(AddTradeSchema)
      .mutation(async ({ ctx, input }) => await addTrade(ctx.db, input)),
  }),
});

export default workerRouter;
