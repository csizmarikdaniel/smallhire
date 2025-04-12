import { z } from "zod";
import { zfd } from "zod-form-data";

export const CreateReservationSchema = z.object({
  startDate: z.date(),
  endDate: z.date().optional(),
  formData: zfd.formData({
    workerId: z.string(),
    description: z.string(),
    images: z.any().optional(),
  }),
});

export type CreateReservationInput = {
  startDate: Date;
  endDate?: Date;
  formData: {
    workerId: string;
    description: string;
    images: File[] | File | null;
  };
};

export type EditDescriptionInput = {
  reservationId: string;
  description: string;
};

export const EditDescriptionSchema = z.object({
  reservationId: z.string(),
  description: z.string(),
});

export type CreateOfferInput = {
  reservationId: string;
  price: number;
};

export const CreateOfferSchema = z.object({
  reservationId: z.string(),
  price: z.number(),
});

export type RemoveReservationImageInput = {
  reservationId: string;
  imageId: string;
};

export const RemoveReservationImageSchema = z.object({
  reservationId: z.string(),
  imageId: z.string(),
});

export type AddReservationImageInput = {
  reservationId: string;
  images: File[] | File | null;
};

export const AddReservationImageSchema = zfd.formData({
  images: z.any(),
  reservationId: z.string(),
});

export type GetReservationsInput = {
  search?: string;
  status?: string[];
};

export const GetReservationsSchema = z.object({
  search: z.string().optional(),
  status: z.array(z.string()).optional(),
});
