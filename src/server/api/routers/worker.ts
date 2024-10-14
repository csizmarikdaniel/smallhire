import { authProcedure, router } from "@/server/api/trpc";
import addTrade from "@/server/services/worker/add-trade";
import deleteTrade from "@/server/services/worker/delete-trade";
import editTrade from "@/server/services/worker/edit-trade";
import getOwnReferences from "@/server/services/worker/get-own-references";
import getReferenceById from "@/server/services/worker/get-reference-by-id";
import getTrade from "@/server/services/worker/get-trade";
import getTrades from "@/server/services/worker/get-trades";
import uploadReferenceImage from "@/server/services/worker/upload-reference-image";
import {
  AddTradeSchema,
  DeleteTradeSchema,
  EditTradeSchema,
} from "@/types/worker";
import { z } from "zod";
import { zfd } from "zod-form-data";

const workerRouter = router({
  trades: router({
    list: authProcedure
      .input(z.object({ id: z.string() }).optional())
      .query(async ({ ctx, input }) => await getTrades(ctx.db, input)),
    edit: authProcedure
      .input(EditTradeSchema)
      .mutation(async ({ ctx, input }) => await editTrade(ctx.db, input)),
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
  reference: router({
    list: authProcedure.query(
      async ({ ctx }) => await getOwnReferences(ctx.db),
    ),
    image: router({
      upload: authProcedure
        .input(zfd.formData({ referenceId: z.string(), file: z.any() }))
        .mutation(
          async ({ ctx, input }) =>
            await uploadReferenceImage(
              ctx.db,
              input as { referenceId: string; file: File },
            ),
        ),
    }),
    get: authProcedure
      .input(z.object({ referenceId: z.string() }))
      .query(async ({ ctx, input }) => await getReferenceById(ctx.db, input)),
  }),
});

export default workerRouter;
