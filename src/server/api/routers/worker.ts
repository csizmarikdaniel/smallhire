import { authProcedure, router } from "@/server/api/trpc";
import addReference from "@/server/services/worker/reference/add-reference";
import addTrade from "@/server/services/worker/trade/add-trade";
import deleteTrade from "@/server/services/worker/trade/delete-trade";
import editTrade from "@/server/services/worker/trade/edit-trade";
import getOwnReferences from "@/server/services/worker/reference/get-own-references";
import getReferenceById from "@/server/services/worker/reference/get-reference-by-id";
import getTrade from "@/server/services/worker/trade/get-trade";
import getTrades from "@/server/services/worker/trade/get-trades";
import removeReferenceImage from "@/server/services/worker/reference/remove-reference-image";
import uploadReferenceImage from "@/server/services/worker/reference/upload-reference-image";
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
        .input(
          zfd.formData({
            referenceId: z.string(),
            file: z.array(z.any()).optional(),
          }),
        )
        .mutation(
          async ({ ctx, input }) =>
            await uploadReferenceImage(
              ctx.db,
              input as { referenceId: string; images: File[] },
            ),
        ),
      delete: authProcedure
        .input(z.object({ referenceId: z.string(), imageId: z.string() }))
        .mutation(
          async ({ ctx, input }) => await removeReferenceImage(ctx.db, input),
        ),
    }),
    get: authProcedure
      .input(z.object({ referenceId: z.string() }))
      .query(async ({ ctx, input }) => await getReferenceById(ctx.db, input)),
    create: authProcedure
      .input(
        zfd.formData({
          description: z.string(),
          images: z.array(z.any()).optional(),
        }),
      )
      .mutation(
        async ({ ctx, input }) =>
          await addReference(
            ctx.db,
            input as { description: string; images: File[] },
          ),
      ),
  }),
});

export default workerRouter;
