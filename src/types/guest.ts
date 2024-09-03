import { z } from "zod";

export const getUserByIdSchema = z.object({ id: z.string() });
export type IdInput = z.infer<typeof getUserByIdSchema>;
