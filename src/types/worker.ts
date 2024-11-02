import { z } from "zod";
import { zfd } from "zod-form-data";

export type EditTradeInput = {
  id: string;
  name: string;
  yearsOfExperience: number;
};
export const EditTradeSchema = z.object({
  id: z.string(),
  name: z.string(),
  yearsOfExperience: z.coerce.number(),
});

export type DeleteTradeInput = {
  id: string;
};

export const DeleteTradeSchema = z.object({
  id: z.string(),
});

export type AddTradeInput = {
  name: string;
  yearsOfExperience: number;
};
export const AddTradeSchema = z.object({
  name: z.string({ message: "Név megadása kötelező" }),
  yearsOfExperience: z
    .string()
    .min(1, "Évek számának megadása kötelező!")
    .pipe(z.coerce.number()),
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
  id: string;
  description: string;
};

export const EditReferenceSchema = z.object({
  id: z.string(),
  description: z.string(),
});

export type AddReferenceImageInput = {
  referenceId: string;
  images: File[] | File | null;
};

export const AddReferenceImageSchema = zfd.formData({
  referenceId: z.string(),
  images: z.any(),
});
