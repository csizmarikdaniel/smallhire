import { beforeEach, expect, it, test } from "vitest";
import getAdmin from "./get-admin";
import login from "@/server/services/auth/login";
import { db } from "@/server/db";

test("should return admin", async () => {
  const admin = await getAdmin(db);
  expect(admin).toThrowError("Unauthorized");
});
