import { login } from "@/server/services/auth/login";
import { publicProcedure, router } from "@/server/api/trpc";
import { LoginSchema, RegisterSchema } from "@/types/auth";
import { register } from "@/server/services/auth/register";

const authRouter = router({
  user: router({
    login: publicProcedure
      .input(LoginSchema)
      .mutation(async ({ ctx, input }) => {
        return await login(ctx.db, input);
      }),
    register: publicProcedure
      .input(RegisterSchema)
      .mutation(async ({ ctx, input }) => {
        return await register(ctx.db, input);
      }),
  }),
});

export default authRouter;
