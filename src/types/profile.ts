import { z } from "zod";

export type EditUserInput = {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
};

export const EditUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  phone: z.string().min(1),
});
