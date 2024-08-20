import { z } from "zod";

export type EditWorkerInput = {
  id: string;
  name: string;
  email: string;
};

export const EditWorkerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type CreateWorkerInput = {
  name: string;
  email: string;
  password: string;
};

export const CreateWorkerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
