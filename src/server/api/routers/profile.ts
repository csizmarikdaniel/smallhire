import { authProcedure, router } from "../trpc";
import getPersonalData from "@/server/services/profile/get-personal-data";
import { EditUserSchema } from "@/types/profile";
import editPersonalData from "@/server/services/profile/edit-personal-data";

const profileRouter = router({
  get: authProcedure.query(async ({ ctx }) => await getPersonalData(ctx.db)),
  update: authProcedure
    .input(EditUserSchema)
    .mutation(async ({ ctx, input }) => await editPersonalData(ctx.db, input)),
});

export default profileRouter;
