import { createCallerFactory, router } from "@/server/api/trpc";
import authRouter from "./routers/auth";
import workerRouter from "./routers/worker";
import guestRouter from "./routers/guest";
import profileRouter from "./routers/profile";
import reservationRouter from "./routers/reservation";
import customerRouter from "./routers/customer";
import notificationRouter from "./routers/notification";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  auth: authRouter,
  worker: workerRouter,
  guest: guestRouter,
  profile: profileRouter,
  reservation: reservationRouter,
  customer: customerRouter,
  notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
