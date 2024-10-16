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
  name: z.string({ message: "Név megadása kötelező!" }).min(1),
  email: z
    .string({ message: "Email megadása kötelező!" })
    .email({ message: "Nem megfelelő email formátum!" }),
  address: z.string({ message: "Cím megadása kötelező!" }).min(1),
  city: z.string({ message: "Város megadása kötelező!" }).min(1),
  zipCode: z.string({ message: "Irányítószám megadása kötelező!" }).min(1),
  phone: z.string({ message: "Telefonszám megadása kötelező!" }).min(1),
});
