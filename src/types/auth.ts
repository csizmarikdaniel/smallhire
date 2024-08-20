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
  role: "worker" | "customer";
};

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  role: z.union([z.literal("worker"), z.literal("customer")]),
});
