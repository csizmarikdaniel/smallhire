import getReservation from "@/server/services/reservation/get-reservation";
import { authProcedure, router } from "../trpc";
import getReservations from "@/server/services/reservation/get-reservations";
import editDescription from "@/server/services/reservation/edit-description";
import createReservation from "@/server/services/reservation/create-reservation";
import cancelReservation from "@/server/services/reservation/cancel-reservation";
import acceptOffer from "@/server/services/reservation/accept-offer";
import rejectOffer from "@/server/services/reservation/reject-offer";
import createOffer from "@/server/services/reservation/create-offer";
import completeReservation from "@/server/services/reservation/complete-reservation";
import rejectReservation from "@/server/services/reservation/reject-reservation";
import {
  type AddReservationImageInput,
  AddReservationImageSchema,
  CreateOfferSchema,
  type CreateReservationInput,
  CreateReservationSchema,
  EditDescriptionSchema,
  GetReservationsSchema,
  RemoveReservationImageSchema,
} from "@/types/reservation";
import removeImage from "@/server/services/reservation/image/remove-image";
import addReservationImage from "@/server/services/reservation/image/add-reservation-image";
import { ReservationIdSchema } from "@/types";

const reservationRouter = router({
  get: authProcedure
    .input(ReservationIdSchema)
    .query(
      async ({ ctx, input }) =>
        await getReservation(ctx.db, ctx.session, input),
    ),
  list: authProcedure
    .input(GetReservationsSchema)
    .query(
      async ({ ctx, input }) =>
        await getReservations(ctx.db, ctx.session, input),
    ),
  create: authProcedure
    .input(CreateReservationSchema)
    .mutation(
      async ({ ctx, input }) =>
        await createReservation(
          ctx.db,
          ctx.session,
          input as CreateReservationInput,
        ),
    ),
  description: router({
    edit: authProcedure
      .input(EditDescriptionSchema)
      .mutation(
        async ({ ctx, input }) =>
          await editDescription(ctx.db, ctx.session, input),
      ),
  }),
  cancel: authProcedure
    .input(ReservationIdSchema)
    .mutation(
      async ({ ctx, input }) =>
        await cancelReservation(ctx.db, ctx.session, input),
    ),
  reject: authProcedure
    .input(ReservationIdSchema)
    .mutation(
      async ({ ctx, input }) =>
        await rejectReservation(ctx.db, ctx.session, input),
    ),
  acceptOffer: authProcedure
    .input(ReservationIdSchema)
    .mutation(
      async ({ ctx, input }) => await acceptOffer(ctx.db, ctx.session, input),
    ),
  rejectOffer: authProcedure
    .input(ReservationIdSchema)
    .mutation(
      async ({ ctx, input }) => await rejectOffer(ctx.db, ctx.session, input),
    ),
  createOffer: authProcedure
    .input(CreateOfferSchema)
    .mutation(
      async ({ ctx, input }) => await createOffer(ctx.db, ctx.session, input),
    ),
  complete: authProcedure
    .input(ReservationIdSchema)
    .mutation(
      async ({ ctx, input }) =>
        await completeReservation(ctx.db, ctx.session, input),
    ),
  image: router({
    remove: authProcedure
      .input(RemoveReservationImageSchema)
      .mutation(
        async ({ ctx, input }) => await removeImage(ctx.db, ctx.session, input),
      ),
    add: authProcedure
      .input(AddReservationImageSchema)
      .mutation(
        async ({ ctx, input }) =>
          await addReservationImage(
            ctx.db,
            ctx.session,
            input as AddReservationImageInput,
          ),
      ),
  }),
});

export default reservationRouter;
