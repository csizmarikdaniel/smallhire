import getReservation from "@/server/services/reservation/get-reservation";
import { authProcedure, router } from "../trpc";
import { z } from "zod";
import getReservations from "@/server/services/reservation/get-reservations";
import editDescription from "@/server/services/reservation/edit-description";
import createReservation from "@/server/services/reservation/create-reservation";

const reservationRouter = router({
  get: authProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => getReservation(ctx.db, input)),
  list: authProcedure.query(async ({ ctx }) => await getReservations(ctx.db)),
  create: authProcedure
    .input(
      z.object({
        customerId: z.string(),
        workerId: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => await createReservation(ctx.db, input)),
  description: router({
    edit: authProcedure
      .input(z.object({ id: z.string(), description: z.string() }))
      .mutation(async ({ ctx, input }) => await editDescription(ctx.db, input)),
  }),
});

export default reservationRouter;
