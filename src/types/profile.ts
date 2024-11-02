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
  name: z
    .string({ message: "Név megadása kötelező!" })
    .min(1, { message: "Név megadása kötelező!" }),
  email: z
    .string({ message: "Email megadása kötelező!" })
    .email({ message: "Nem megfelelő email formátum!" }),
  address: z
    .string({ message: "Cím megadása kötelező!" })
    .min(1, { message: "Cím megadása kötelező!" }),
  city: z
    .string({ message: "Város megadása kötelező!" })
    .min(1, { message: "Város megadása kötelező!" }),
  zipCode: z
    .string({ message: "Irányítószám megadása kötelező!" })
    .min(1, { message: "Irányítószám megadása kötelező!" }),
  phone: z
    .string({ message: "Telefonszám megadása kötelező!" })
    .min(1, { message: "Telefonszám megadása kötelező!" }),
});
