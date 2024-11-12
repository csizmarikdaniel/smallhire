import getAdmin from "@/server/services/admin/get-admin";
import { adminProcedure, router } from "../trpc";
import getWorkers from "@/server/services/admin/worker/get-workers";
import getCustomers from "@/server/services/admin/customer/get-customers";
import getCustomer from "@/server/services/admin/customer/get-customer";
import editPersonalData from "@/server/services/admin/edit-personal-data";
import deleteCustomer from "@/server/services/admin/customer/delete-customer";
import addCustomer from "@/server/services/admin/customer/add-customer";
import {
  AddCustomerSchema,
  AddWorkerSchema,
  type AdminAddReferenceInput,
  AdminAddReferenceSchema,
  AdminAddTradeSchema,
  AdminEditProfileSchema,
  AdminListCustomersSchema,
  AdminListWorkersSchema,
  EditDatesSchema,
  EditReservationUserSchema,
  EditStatusSchema,
} from "@/types/admin";
import addWorker from "@/server/services/admin/worker/add-worker";
import { DeleteReferenceImageSchema } from "@/types/worker";
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
import deleteWorker from "@/server/services/admin/worker/delete-worker";
import {
  CustomerIdSchema,
  ReferenceIdSchema,
  ReservationIdSchema,
  TradeIdSchema,
  WorkerIdSchema,
} from "@/types";
import getReservations from "@/server/services/admin/reservation/get-reservations";
import getReservation from "@/server/services/admin/reservation/get-reservation";
import editWorker from "@/server/services/admin/reservation/edit-worker";
import editCustomer from "@/server/services/admin/reservation/edit-customer";
import editStatus from "@/server/services/admin/reservation/edit-status";
import editDates from "@/server/services/admin/reservation/edit-dates";

const adminRouter = router({
  get: adminProcedure.query(
    async ({ ctx }) => await getAdmin(ctx.db, ctx.session),
  ),
  worker: router({
    list: adminProcedure
      .input(AdminListWorkersSchema)
      .query(async ({ ctx, input }) => await getWorkers(ctx.db, input ?? {})),
    add: adminProcedure
      .input(AddWorkerSchema)
      .mutation(async ({ ctx, input }) => await addWorker(ctx.db, input)),
    getPersonalData: adminProcedure
      .input(WorkerIdSchema)
      .query(async ({ ctx, input }) => await getWorker(ctx.db, input)),
    edit: adminProcedure
      .input(AdminEditProfileSchema)
      .mutation(
        async ({ ctx, input }) => await editPersonalData(ctx.db, input),
      ),
    delete: adminProcedure
      .input(WorkerIdSchema)
      .mutation(async ({ ctx, input }) => await deleteWorker(ctx.db, input)),
    trade: router({
      list: adminProcedure
        .input(WorkerIdSchema)
        .query(
          async ({ ctx, input }) => await getWorkerTradeIds(ctx.db, input),
        ),
      get: adminProcedure
        .input(TradeIdSchema)
        .query(async ({ ctx, input }) => await getTrade(ctx.db, input)),
      delete: adminProcedure
        .input(TradeIdSchema)
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
        .input(WorkerIdSchema)
        .query(async ({ ctx, input }) => await getReferences(ctx.db, input)),
      get: adminProcedure
        .input(ReferenceIdSchema)
        .query(async ({ ctx, input }) => await getReference(ctx.db, input)),
      delete: adminProcedure
        .input(ReferenceIdSchema)
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
          .input(DeleteReferenceImageSchema)
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
      .input(CustomerIdSchema)
      .query(async ({ ctx, input }) => await getCustomer(ctx.db, input)),
    edit: adminProcedure
      .input(AdminEditProfileSchema)
      .mutation(
        async ({ ctx, input }) => await editPersonalData(ctx.db, input),
      ),
    delete: adminProcedure
      .input(CustomerIdSchema)
      .mutation(async ({ ctx, input }) => await deleteCustomer(ctx.db, input)),
    add: adminProcedure
      .input(AddCustomerSchema)
      .mutation(async ({ ctx, input }) => await addCustomer(ctx.db, input)),
  }),
  reservation: router({
    list: adminProcedure.query(
      async ({ ctx }) => await getReservations(ctx.db),
    ),
    get: adminProcedure
      .input(ReservationIdSchema)
      .query(async ({ ctx, input }) => await getReservation(ctx.db, input)),
    editWorker: adminProcedure
      .input(EditReservationUserSchema)
      .mutation(async ({ ctx, input }) => await editWorker(ctx.db, input)),
    editCustomer: adminProcedure
      .input(EditReservationUserSchema)
      .mutation(async ({ ctx, input }) => await editCustomer(ctx.db, input)),
    editStatus: adminProcedure
      .input(EditStatusSchema)
      .mutation(async ({ ctx, input }) => await editStatus(ctx.db, input)),
    editDates: adminProcedure
      .input(EditDatesSchema)
      .mutation(async ({ ctx, input }) => await editDates(ctx.db, input)),
  }),
});

export default adminRouter;
