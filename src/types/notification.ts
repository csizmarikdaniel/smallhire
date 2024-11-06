import { z } from "zod";

export type NotificationIdInput = { notificationId: string };

export const NotificationIdSchema = z.object({
  notificationId: z.string(),
});
