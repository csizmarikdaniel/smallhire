import { z } from "zod";

export type LoginInput = {
  email: string;
  password: string;
};

export const LoginSchema = z.object({
  email: z
    .string({ message: "Email megadása kötelező!" })
    .email({ message: "Nem megfelelő email formátum!" }),
  password: z
    .string({ message: "Jelszó megadása kötelező!" })
    .min(8, { message: "A jelszó minimum 8 karakter hosszú kell legyen!" }),
});

export type RegisterInput = {
  email: string;
  name: string;
  password: string;
  role: "WORKER" | "CUSTOMER";
  address: string;
  city: string;
  zipCode: string;
  phone: string;
};

export const RegisterSchema = z.object({
  email: z
    .string({ message: "Email megadása kötelező!" })
    .email({ message: "Nem megfelelő email formátum!" }),
  name: z.string({ message: "Név megadása kötelező!" }).min(1),
  password: z
    .string({ message: "Jelszó megadása kötelező!" })
    .min(8, { message: "A jelszó minimum 8 karakter hosszú kell legyen!" }),
  role: z.union([z.literal("WORKER"), z.literal("CUSTOMER")]),
  address: z.string({ message: "Cím megadása kötelező!" }).min(1),
  city: z.string({ message: "Város megadása kötelező!" }).min(1),
  zipCode: z.string({ message: "Irányítószám megadása kötelező!" }).min(1),
  phone: z.string({ message: "Telefonszám megadása kötelező!" }).min(1),
});
