import { z } from "zod";
import { zfd } from "zod-form-data";

export type AddCustomerInput = {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  zipCode: string;
  address: string;
};

export const AddCustomerSchema = z.object({
  name: z
    .string({ message: "A név csak szöveg lehet!" })
    .min(3, { message: "A névnek legalább 3 karakternek kell lennie!" }),
  email: z
    .string({ message: "Az email csak szöveg lehet!" })
    .email({ message: "Az email formátuma nem megfelelő!" }),
  password: z
    .string({ message: "A jelszó csak szöveg lehet!" })
    .min(8, { message: "A jelszónak legalább 8 karakternek kell lennie!" }),
  phone: z
    .string({ message: "Telefonszám megadása kötelező!" })
    .min(1, { message: "Telefonszám megadása kötelező!" }),
  city: z
    .string({ message: "Város megadása kötelező!" })
    .min(1, { message: "Város megadása kötelező!" }),
  zipCode: z
    .string({ message: "Irányítószám megadása kötelező!" })
    .min(1, { message: "Irányítószám megadása kötelező!" }),
  address: z
    .string({ message: "Cím megadása kötelező!" })
    .min(1, { message: "Cím megadása kötelező!" }),
});

export type AdminListWorkersInput = {
  search?: string;
  trades?: string[];
  page?: number;
  limit?: number;
};

export const AdminListWorkersSchema = z
  .object({
    search: z.string().optional(),
    trades: z.array(z.string()).optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
  })
  .optional();

export type AdminListCustomersInput = {
  search?: string;
  page?: number;
  limit?: number;
};

export const AdminListCustomersSchema = z
  .object({
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
  })
  .optional();

export type AddWorkerInput = {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  zipCode: string;
  address: string;
};

export const AddWorkerSchema = z.object({
  name: z
    .string({ message: "A név csak szöveg lehet!" })
    .min(3, { message: "A névnek legalább 3 karakternek kell lennie!" }),
  email: z
    .string({ message: "Az email csak szöveg lehet!" })
    .email({ message: "Az email formátuma nem megfelelő!" }),
  password: z
    .string({ message: "A jelszó csak szöveg lehet!" })
    .min(8, { message: "A jelszónak legalább 8 karakternek kell lennie!" }),
  phone: z
    .string({ message: "Telefonszám megadása kötelező!" })
    .min(1, { message: "Telefonszám megadása kötelező!" }),
  city: z
    .string({ message: "Város megadása kötelező!" })
    .min(1, { message: "Város megadása kötelező!" }),
  zipCode: z
    .string({ message: "Irányítószám megadása kötelező!" })
    .min(1, { message: "Irányítószám megadása kötelező!" }),
  address: z
    .string({ message: "Cím megadása kötelező!" })
    .min(1, { message: "Cím megadása kötelező!" }),
});

export type AdminAddTradeInput = {
  name: string;
  yearsOfExperience: number;
  workerId: string;
};

export const AdminAddTradeSchema = z.object({
  name: z
    .string({ message: "A név csak szöveg lehet!" })
    .min(3, { message: "A névnek legalább 3 karakternek kell lennie!" }),
  yearsOfExperience: z.coerce
    .number({ message: "Az évek száma csak szám lehet!" })
    .min(1, { message: "Az évek számának legalább 1-nek kell lennie!" }),
  workerId: z.string({ message: "A munkás ID megadása kötelező!" }),
});

export type AdminAddReferenceInput = {
  formData: { description: string; images: File[] | File | null };
  workerId: string;
};

export const AdminAddReferenceSchema = z.object({
  formData: zfd.formData({
    description: z
      .string({ message: "A leírás csak szöveg lehet!" })
      .min(3, { message: "A leírásnak legalább 3 karakternek kell lennie!" }),
    images: z.any().optional(),
  }),
  workerId: z.string({ message: "A munkás ID megadása kötelező!" }),
});
