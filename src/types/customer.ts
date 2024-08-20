import { z } from "zod";

export type EditCustomerInput = {
  id: string;
  name: string;
  email: string;
};

export const EditCustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});
