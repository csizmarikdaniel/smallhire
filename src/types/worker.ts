import { z } from "zod";
import { zfd } from "zod-form-data";

export type EditTradeInput = {
  id: string;
  workerId: string;
  name: string;
  yearsOfExperience: number;
  pricePerHour: number;
};
export const EditTradeSchema = z.object({
  id: z.string(),
  workerId: z.string(),
  name: z.string().min(1, { message: "Név megadása kötelező" }),
  yearsOfExperience: z.coerce.number({
    message: "Tapasztalat megadása kötelező",
  }),
  pricePerHour: z.coerce.number({ message: "Órabér megadása kötelező" }),
});

export type AddTradeInput = {
  name: string;
  yearsOfExperience: number;
  pricePerHour: number;
};
export const AddTradeSchema = z.object({
  name: z.string({ message: "Név megadása kötelező" }),
  yearsOfExperience: z.coerce.number({
    message: "Tapasztalat megadása kötelező",
  }),
  pricePerHour: z.coerce.number({ message: "Órabér megadása kötelező" }),
});

export type AddReferenceInput = {
  description: string;
  images: File[] | File | null;
};

export const AddReferenceSchema = zfd.formData({
  description: z.string({ message: "Leírás megadása kötelező" }),
  images: z.array(z.any()),
});

export type EditReferenceInput = {
  referenceId: string;
  description: string;
};

export const EditReferenceSchema = z.object({
  referenceId: z.string(),
  description: z.string().min(1, { message: "Leírás megadása kötelező" }),
});

export type AddReferenceImageInput = {
  referenceId: string;
  images: File[] | File | null;
};

export const AddReferenceImageSchema = zfd.formData({
  referenceId: z.string(),
  images: z.any(),
});

export type ListWorkersInput = {
  search?: string;
  trades?: string[];
  sort?: string;
  limit?: number;
  page?: number;
};

export const ListWorkersSchema = z
  .object({
    search: z.string().optional(),
    trades: z.array(z.string()).optional(),
    sort: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
  })
  .optional();

export type ListTradesInput =
  | {
      id: string;
    }
  | undefined;

export const ListTradesSchema = z
  .object({
    id: z.string(),
  })
  .optional();

export type DeleteReferenceImageInput = {
  referenceId: string;
  imageId: string;
};

export const DeleteReferenceImageSchema = z.object({
  referenceId: z.string(),
  imageId: z.string(),
});
