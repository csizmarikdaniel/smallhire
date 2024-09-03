import { z } from "zod";

export type EditCustomerInput = {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
};

export const EditCustomerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
});
