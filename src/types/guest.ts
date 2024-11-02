import { z } from "zod";

export const GetUserByIdSchema = z.object({ id: z.string() });
export type IdInput = z.infer<typeof GetUserByIdSchema>;

export type ListWorkersInput = {
  search?: string;
  trades?: string[];
  sort?: string;
  limit?: number;
  page?: number;
};

export const ListWorkersSchema = z
  .object({
    search: z.string().optional(),
    trades: z.array(z.string()).optional(),
    sort: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
  })
  .optional();
