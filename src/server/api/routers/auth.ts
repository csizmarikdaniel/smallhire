import { login } from "@/server/services/auth/login";
import { publicProcedure, router } from "@/server/api/trpc";
import { LoginSchema, RegisterSchema } from "@/types/auth";
import { register } from "@/server/services/auth/register";
import { logout } from "@/server/services/auth/logout";

const authRouter = router({
  user: router({
    login: publicProcedure
      .input(LoginSchema)
      .mutation(async ({ ctx, input }) => await login(ctx.db, input)),
    register: publicProcedure
      .input(RegisterSchema)
      .mutation(async ({ ctx, input }) => await register(ctx.db, input)),
    logout: publicProcedure.mutation(async () => await logout()),
  }),
});

export default authRouter;
