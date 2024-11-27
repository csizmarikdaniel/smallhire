import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import editStatus from "../edit-status";

test("should edit status", async () => {
  await prisma.reservation.create({
    data: {
      id: "1",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-01-02"),
      description: "description",
      status: "RESERVED",
      customerId: "1",
      workerId: "1",
    },
  });

  const data = await editStatus(prisma, {
    reservationId: "1",
    status: "CANCELLED",
  });

  expect(data.success).toEqual(true);
});

test("should throw error if reservation not found", async () => {
  await expect(
    editStatus(prisma, {
      reservationId: "1",
      status: "CANCELLED",
    }),
  ).rejects.toThrowError();
});
