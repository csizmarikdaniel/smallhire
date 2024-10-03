import { authProcedure, router } from "../trpc";
import getPersonalData from "@/server/services/profile/get-personal-data";
import { EditUserSchema } from "@/types/profile";
import editPersonalData from "@/server/services/profile/edit-personal-data";
import editProfilePicture from "@/server/services/profile/edit-profile-picture";
import { zfd } from "zod-form-data";
import { z } from "zod";
import getProfilePicture from "@/server/services/profile/get-profile-picture";
import removeProfilePicture from "@/server/services/profile/remove-profile-picture";

const profileRouter = router({
  get: authProcedure.query(async ({ ctx }) => await getPersonalData(ctx.db)),
  update: authProcedure
    .input(EditUserSchema)
    .mutation(async ({ ctx, input }) => await editPersonalData(ctx.db, input)),
  image: router({
    edit: authProcedure
      .input(zfd.formData({ file: z.any() }))
      .mutation(
        async ({ ctx, input }) =>
          await editProfilePicture(ctx.db, input.file as File),
      ),
    get: authProcedure.query(
      async ({ ctx }) => await getProfilePicture(ctx.db),
    ),
    remove: authProcedure.mutation(
      async ({ ctx }) => await removeProfilePicture(ctx.db),
    ),
  }),
});

export default profileRouter;
