import { expect, test, vi } from "vitest";
import addReferenceImage from "../add-reference-image";
import { prisma } from "@/test/setup-db";
import { readFileSync } from "fs";

vi.mock("utapi.uploadFiles", () => {
  return [
    {
      data: {
        key: "key",
      },
    },
  ];
});

/* test("should add reference image", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email1@email.com",
      password: "password",
      role: "WORKER",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "1",
    },
  });
  await prisma.reference.create({
    data: {
      id: "1",
      workerId: "1",
      description: "description",
    },
  });

  const fileBuffer = readFileSync("public/Placeholder.png");

  const file = new File([fileBuffer], "Placeholder.png", {
    type: "image/png",
  });

  const data = await addReferenceImage(prisma, {
    referenceId: "1",
    images: [file],
  });

  expect(data.success).toEqual(true);
}); */

test("should throw error if reference not found", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email1@email.com",
      password: "password",
      role: "WORKER",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  await prisma.worker.create({
    data: {
      userId: "1",
    },
  });

  await expect(
    addReferenceImage(prisma, { referenceId: "1", images: [] }),
  ).rejects.toThrowError("Reference not found");
});

test("should throw error if invalid file type", async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "email1@email.com",
      password: "password",
      role: "WORKER",
      address: "address1",
      phone: "phone1",
      name: "name1",
      city: "city1",
      zipCode: "zipCode1",
    },
  });

  // TODO
});
