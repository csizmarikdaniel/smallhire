import { createCallerFactory, router } from "@/server/api/trpc";
import adminRouter from "./routers/admin";
import authRouter from "./routers/auth";
import workerRouter from "./routers/worker";
import guestRouter from "./routers/guest";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  admin: adminRouter,
  auth: authRouter,
  worker: workerRouter,
  guest: guestRouter,
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
