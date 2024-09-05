import { cookies } from "next/headers";

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}
