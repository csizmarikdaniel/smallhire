import { prisma } from "@/test/setup-db";
import { expect, test } from "vitest";
import editDates from "../edit-dates";

test("should edit dates", async () => {
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

  const data = await editDates(prisma, {
    reservationId: "1",
    startDate: new Date("2021-01-03"),
    endDate: new Date("2021-01-04"),
  });

  expect(data.success).toEqual(true);
});

test("should throw error if reservation not found", async () => {
  await expect(
    editDates(prisma, {
      reservationId: "1",
      startDate: new Date("2021-01-03"),
      endDate: new Date("2021-01-04"),
    }),
  ).rejects.toThrowError();
});

test("should thorw error if startDate is after the endDate", async () => {
  await expect(
    editDates(prisma, {
      reservationId: "1",
      startDate: new Date("2021-01-03"),
      endDate: new Date("2021-01-02"),
    }),
  ).rejects.toThrowError();
});
