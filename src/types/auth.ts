import { z } from "zod";

export type LoginInput = {
  email: string;
  password: string;
};

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
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
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8),
  role: z.union([z.literal("WORKER"), z.literal("CUSTOMER")]),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  phone: z.string().min(1),
});
