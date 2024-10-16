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
