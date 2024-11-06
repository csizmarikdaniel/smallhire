import { authProcedure, router } from "../trpc";
import getPersonalData from "@/server/services/profile/get-personal-data";
import {
  EditProfilePictureInput,
  EditProfilePictureSchema,
  EditUserSchema,
} from "@/types/profile";
import editPersonalData from "@/server/services/profile/edit-personal-data";
import editProfilePicture from "@/server/services/profile/edit-profile-picture";
import getProfilePicture from "@/server/services/profile/get-profile-picture";
import removeProfilePicture from "@/server/services/profile/remove-profile-picture";

const profileRouter = router({
  get: authProcedure.query(
    async ({ ctx }) => await getPersonalData(ctx.db, ctx.session),
  ),
  update: authProcedure
    .input(EditUserSchema)
    .mutation(
      async ({ ctx, input }) =>
        await editPersonalData(ctx.db, ctx.session, input),
    ),
  image: router({
    edit: authProcedure
      .input(EditProfilePictureSchema)
      .mutation(
        async ({ ctx, input }) =>
          await editProfilePicture(
            ctx.db,
            ctx.session,
            input as EditProfilePictureInput,
          ),
      ),
    get: authProcedure.query(
      async ({ ctx }) => await getProfilePicture(ctx.db, ctx.session),
    ),
    remove: authProcedure.mutation(
      async ({ ctx }) => await removeProfilePicture(ctx.db, ctx.session),
    ),
  }),
});

export default profileRouter;
