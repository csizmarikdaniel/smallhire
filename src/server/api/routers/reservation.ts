import getReservation from "@/server/services/reservation/get-reservation";
import { authProcedure, router } from "../trpc";
import { z } from "zod";
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
  type CreateReservationInput,
  CreateReservationSchema,
} from "@/types/reservation";
import removeImage from "@/server/services/reservation/image/remove-image";
import { zfd } from "zod-form-data";
import addReservationImage from "@/server/services/reservation/image/add-reservation-image";

const reservationRouter = router({
  get: authProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => await getReservation(ctx.db, input)),
  list: authProcedure.query(async ({ ctx }) => await getReservations(ctx.db)),
  create: authProcedure
    .input(CreateReservationSchema)
    .mutation(
      async ({ ctx, input }) =>
        await createReservation(ctx.db, input as CreateReservationInput),
    ),
  description: router({
    edit: authProcedure
      .input(z.object({ id: z.string(), description: z.string() }))
      .mutation(async ({ ctx, input }) => await editDescription(ctx.db, input)),
  }),
  cancel: authProcedure
    .input(z.object({ reservationId: z.string() }))
    .mutation(async ({ ctx, input }) => await cancelReservation(ctx.db, input)),
  reject: authProcedure
    .input(z.object({ reservationId: z.string() }))
    .mutation(async ({ ctx, input }) => await rejectReservation(ctx.db, input)),
  acceptOffer: authProcedure
    .input(z.object({ reservationId: z.string() }))
    .mutation(async ({ ctx, input }) => await acceptOffer(ctx.db, input)),
  rejectOffer: authProcedure
    .input(z.object({ reservationId: z.string() }))
    .mutation(async ({ ctx, input }) => await rejectOffer(ctx.db, input)),
  createOffer: authProcedure
    .input(z.object({ reservationId: z.string(), price: z.number() }))
    .mutation(async ({ ctx, input }) => await createOffer(ctx.db, input)),
  complete: authProcedure
    .input(z.object({ reservationId: z.string() }))
    .mutation(
      async ({ ctx, input }) => await completeReservation(ctx.db, input),
    ),
  image: router({
    remove: authProcedure
      .input(z.object({ reservationId: z.string(), imageId: z.string() }))
      .mutation(async ({ ctx, input }) => await removeImage(ctx.db, input)),
    add: authProcedure
      .input(zfd.formData({ images: z.any(), reservationId: z.string() }))
      .mutation(
        async ({ ctx, input }) =>
          await addReservationImage(
            ctx.db,
            input as { images: File[] | File | null; reservationId: string },
          ),
      ),
  }),
});

export default reservationRouter;
