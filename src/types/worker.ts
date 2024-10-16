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
  yearsOfExperience: z.number(),
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
  yearsOfExperience: z.coerce.number({
    message: "Évek számának megadása kötelező",
  }),
});

export type AddReferenceInput = {
  description: string;
  images: File[];
};

export const AddReferenceSchema = zfd.formData({
  description: z.string({ message: "Leírás megadása kötelező" }),
  images: z.array(z.any()),
});
