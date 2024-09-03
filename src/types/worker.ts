import { z } from "zod";

export type EditWorkerInput = {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
};

export const EditWorkerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
});

export type CreateWorkerInput = {
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  zipCode: string;
};

export const CreateWorkerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
});
