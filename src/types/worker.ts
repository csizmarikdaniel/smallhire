import { z } from "zod";

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
