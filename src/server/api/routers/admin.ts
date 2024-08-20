import { editCustomer } from "@/server/services/admin/customer/edit-customer";
import { listCustomer } from "@/server/services/admin/customer/list-customer";
import { createWorker } from "@/server/services/admin/worker/create-worker";
import { editWorker } from "@/server/services/admin/worker/edit-worker";
import { listWorkers } from "@/server/services/admin/worker/list-workers";
import { publicProcedure, router } from "@/server/api/trpc";
import { EditCustomerSchema } from "@/types/customer";
import { CreateWorkerSchema, EditWorkerSchema } from "@/types/worker";

const adminRouter = router({
  worker: router({
    list: publicProcedure.query(async ({ ctx }) => await listWorkers(ctx.db)),
    update: publicProcedure
      .input(EditWorkerSchema)
      .mutation(({ ctx, input }) => editWorker(ctx.db, input)),
    create: publicProcedure
      .input(CreateWorkerSchema)
      .mutation(({ ctx, input }) => createWorker(ctx.db, input)),
  }),
  customer: router({
    list: publicProcedure.query(({ ctx }) => listCustomer(ctx.db)),
    update: publicProcedure
      .input(EditCustomerSchema)
      .mutation(({ ctx, input }) => editCustomer(ctx.db, input)),
  }),
});

export default adminRouter;
