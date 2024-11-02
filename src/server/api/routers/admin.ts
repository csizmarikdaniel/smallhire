import getAdmin from "@/server/services/admin/get-admin";
import { adminProcedure, publicProcedure, router } from "../trpc";
import adminLogin from "@/server/services/admin/admin-login";
import { LoginSchema } from "@/types/auth";
import getWorkers from "@/server/services/admin/worker/get-workers";
import getCustomers from "@/server/services/admin/customer/get-customers";
import getCustomer from "@/server/services/admin/customer/get-customer";
import { z } from "zod";
import { EditUserSchema } from "@/types/profile";
import editPersonalData from "@/server/services/admin/edit-personal-data";
import deleteCustomer from "@/server/services/admin/customer/delete-customer";
import addCustomer from "@/server/services/admin/customer/add-customer";
import {
  AddCustomerSchema,
  AddWorkerSchema,
  type AdminAddReferenceInput,
  AdminAddReferenceSchema,
  AdminAddTradeSchema,
  AdminListCustomersSchema,
  AdminListWorkersSchema,
} from "@/types/admin";
import addWorker from "@/server/services/admin/worker/add-worker";
import { GetUserByIdSchema } from "@/types/guest";
import getWorker from "@/server/services/admin/worker/get-worker";
import getWorkerTradeIds from "@/server/services/admin/worker/trade/get-worker-trades";
import getTrade from "@/server/services/admin/worker/trade/get-trade";
import deleteTrade from "@/server/services/admin/worker/trade/delete-trade";
import {
  type AddReferenceImageInput,
  AddReferenceImageSchema,
  EditReferenceSchema,
  EditTradeSchema,
} from "@/types/worker";
import editTrade from "@/server/services/admin/worker/trade/edit-trade";
import addTrade from "@/server/services/admin/worker/trade/add-trade";
import getReferences from "@/server/services/admin/worker/reference/get-references";
import getReference from "@/server/services/admin/worker/reference/get-reference";
import deleteReference from "@/server/services/admin/worker/reference/delete-reference";
import editReference from "@/server/services/admin/worker/reference/edit-reference";
import addReference from "@/server/services/admin/worker/reference/add-reference";
import deleteReferenceImage from "@/server/services/admin/worker/reference/delete-reference-image";
import addReferenceImage from "@/server/services/admin/worker/reference/add-reference-image";

const adminRouter = router({
  get: adminProcedure.query(async ({ ctx }) => await getAdmin(ctx.db)),
  login: publicProcedure
    .input(LoginSchema)
    .mutation(async ({ ctx, input }) => await adminLogin(ctx.db, input)),
  worker: router({
    list: adminProcedure
      .input(AdminListWorkersSchema)
      .query(async ({ ctx, input }) => await getWorkers(ctx.db, input ?? {})),
    add: adminProcedure
      .input(AddWorkerSchema)
      .mutation(async ({ ctx, input }) => await addWorker(ctx.db, input)),
    getPersonalData: adminProcedure
      .input(GetUserByIdSchema)
      .query(async ({ ctx, input }) => await getWorker(ctx.db, input)),
    edit: adminProcedure
      .input(EditUserSchema)
      .mutation(
        async ({ ctx, input }) => await editPersonalData(ctx.db, input),
      ),
    trade: router({
      list: adminProcedure
        .input(z.object({ workerId: z.string() }))
        .query(
          async ({ ctx, input }) => await getWorkerTradeIds(ctx.db, input),
        ),
      get: adminProcedure
        .input(z.object({ tradeId: z.string() }))
        .query(async ({ ctx, input }) => await getTrade(ctx.db, input)),
      delete: adminProcedure
        .input(z.object({ tradeId: z.string() }))
        .mutation(async ({ ctx, input }) => await deleteTrade(ctx.db, input)),
      edit: adminProcedure
        .input(EditTradeSchema)
        .mutation(async ({ ctx, input }) => await editTrade(ctx.db, input)),
      add: adminProcedure
        .input(AdminAddTradeSchema)
        .mutation(async ({ ctx, input }) => await addTrade(ctx.db, input)),
    }),
    reference: router({
      list: adminProcedure
        .input(z.object({ workerId: z.string() }))
        .query(async ({ ctx, input }) => await getReferences(ctx.db, input)),
      get: adminProcedure
        .input(z.object({ referenceId: z.string() }))
        .query(async ({ ctx, input }) => await getReference(ctx.db, input)),
      delete: adminProcedure
        .input(z.object({ referenceId: z.string() }))
        .mutation(
          async ({ ctx, input }) => await deleteReference(ctx.db, input),
        ),
      edit: adminProcedure
        .input(EditReferenceSchema)
        .mutation(async ({ ctx, input }) => await editReference(ctx.db, input)),
      add: adminProcedure
        .input(AdminAddReferenceSchema)
        .mutation(
          async ({ ctx, input }) =>
            await addReference(ctx.db, input as AdminAddReferenceInput),
        ),
      image: router({
        delete: adminProcedure
          .input(z.object({ referenceId: z.string(), imageId: z.string() }))
          .mutation(
            async ({ ctx, input }) => await deleteReferenceImage(ctx.db, input),
          ),
        add: adminProcedure
          .input(AddReferenceImageSchema)
          .mutation(
            async ({ ctx, input }) =>
              await addReferenceImage(ctx.db, input as AddReferenceImageInput),
          ),
      }),
    }),
  }),
  customer: router({
    list: adminProcedure
      .input(AdminListCustomersSchema)
      .query(async ({ ctx, input }) => await getCustomers(ctx.db, input ?? {})),
    get: adminProcedure
      .input(z.object({ customerId: z.string() }))
      .query(async ({ ctx, input }) => await getCustomer(ctx.db, input)),
    edit: adminProcedure
      .input(EditUserSchema)
      .mutation(
        async ({ ctx, input }) => await editPersonalData(ctx.db, input),
      ),
    delete: adminProcedure
      .input(z.object({ customerId: z.string() }))
      .mutation(
        async ({ ctx, input }) =>
          await deleteCustomer(ctx.db, input.customerId),
      ),
    add: adminProcedure
      .input(AddCustomerSchema)
      .mutation(async ({ ctx, input }) => await addCustomer(ctx.db, input)),
  }),
});

export default adminRouter;
