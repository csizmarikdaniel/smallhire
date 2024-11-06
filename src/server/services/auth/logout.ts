import { cookies } from "next/headers";

async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export default logout;
