import { z } from "zod";
import { authProcedure, router } from "../trpc";
import { zfd } from "zod-form-data";
import upload from "@/server/services/file/upload";

const fileRouter = router({
  upload: authProcedure
    .input(zfd.formData({ file: z.any() }))
    .mutation(async ({ ctx, input }) => {
      await upload(ctx.db, input.file as File);
    }),
});

export default fileRouter;
