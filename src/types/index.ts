import { z } from "zod";

export type SessionType = {
  user: {
    id: string;
    role: string;
  };
} | null;

export type WorkerIdInput = {
  workerId: string;
};

export const WorkerIdSchema = z.object({
  workerId: z.string({ message: "A munkás ID megadása kötelező!" }),
});

export type TradeIdInput = {
  tradeId: string;
};

export const TradeIdSchema = z.object({
  tradeId: z.string({ message: "A szakma ID megadása kötelező!" }),
});

export type ReferenceIdInput = {
  referenceId: string;
};

export const ReferenceIdSchema = z.object({
  referenceId: z.string({ message: "A referencia ID megadása kötelező!" }),
});

export type CustomerIdInput = {
  customerId: string;
};

export const CustomerIdSchema = z.object({
  customerId: z.string({ message: "A megrendelő ID megadása kötelező!" }),
});

export type ReservationIdInput = {
  reservationId: string;
};

export const ReservationIdSchema = z.object({
  reservationId: z.string({ message: "A foglalás ID megadása kötelező!" }),
});
