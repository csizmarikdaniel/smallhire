import { authProcedure, router } from "../trpc";
import { zfd } from "zod-form-data";

const fileRouter = router({
  upload: authProcedure
    .input(zfd.formData({ file: zfd.file() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input.file);
    }),
});

export default fileRouter;
