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
  type AddReferenceImageInput,
  AddReferenceImageSchema,
  type AddReferenceInput,
  AddReferenceSchema,
  AddTradeSchema,
  DeleteReferenceImageSchema,
  EditReferenceSchema,
  EditTradeSchema,
  ListTradesSchema,
} from "@/types/worker";
import listPublicWorkerData from "@/server/services/worker/list-public-worker-data";
import { ListWorkersSchema } from "@/types/worker";
import getPublicWorkerData from "@/server/services/worker/get-public-worker-data";
import getTradeNames from "@/server/services/worker/get-trade-names";
import { ReferenceIdSchema, TradeIdSchema, WorkerIdSchema } from "@/types";
import removeReference from "@/server/services/worker/reference/remove-reference";
import editReference from "@/server/services/worker/reference/edit-reference";

const workerRouter = router({
  list: authProcedure
    .input(ListWorkersSchema)
    .query(
      async ({ ctx, input }) => await listPublicWorkerData(ctx.db, input ?? {}),
    ),
  get: authProcedure
    .input(WorkerIdSchema)
    .query(async ({ ctx, input }) => await getPublicWorkerData(ctx.db, input)),
  tradeNames: authProcedure.query(
    async ({ ctx }) => await getTradeNames(ctx.db),
  ),
  trades: router({
    list: authProcedure
      .input(ListTradesSchema)
      .query(
        async ({ ctx, input }) => await getTrades(ctx.db, ctx.session, input),
      ),
    edit: authProcedure
      .input(EditTradeSchema)
      .mutation(async ({ ctx, input }) => await editTrade(ctx.db, input)),
    remove: authProcedure
      .input(TradeIdSchema)
      .mutation(async ({ ctx, input }) => await deleteTrade(ctx.db, input)),
    get: authProcedure
      .input(TradeIdSchema)
      .query(async ({ ctx, input }) => await getTrade(ctx.db, input)),
    add: authProcedure
      .input(AddTradeSchema)
      .mutation(
        async ({ ctx, input }) => await addTrade(ctx.db, ctx.session, input),
      ),
  }),
  reference: router({
    list: authProcedure.query(
      async ({ ctx }) => await getOwnReferences(ctx.db, ctx.session),
    ),
    image: router({
      upload: authProcedure
        .input(AddReferenceImageSchema)
        .mutation(
          async ({ ctx, input }) =>
            await uploadReferenceImage(
              ctx.db,
              ctx.session,
              input as AddReferenceImageInput,
            ),
        ),
      delete: authProcedure
        .input(DeleteReferenceImageSchema)
        .mutation(
          async ({ ctx, input }) =>
            await removeReferenceImage(ctx.db, ctx.session, input),
        ),
    }),
    get: authProcedure
      .input(ReferenceIdSchema)
      .query(
        async ({ ctx, input }) =>
          await getReferenceById(ctx.db, ctx.session, input),
      ),
    create: authProcedure
      .input(AddReferenceSchema)
      .mutation(
        async ({ ctx, input }) =>
          await addReference(ctx.db, ctx.session, input as AddReferenceInput),
      ),
    remove: authProcedure
      .input(ReferenceIdSchema)
      .mutation(
        async ({ ctx, input }) =>
          await removeReference(ctx.db, ctx.session, input),
      ),
    edit: authProcedure
      .input(EditReferenceSchema)
      .mutation(
        async ({ ctx, input }) =>
          await editReference(ctx.db, ctx.session, input),
      ),
  }),
});

export default workerRouter;
