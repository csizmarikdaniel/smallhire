import { api } from "@/trpc/server";
import { getSession } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import NotificationDropdown from "./notification-dropdown";

const Navbar = async () => {
  const session = await getSession();
  return (
    <div className="navbar">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">
          <Link href="/">SmallHire</Link>
        </h1>
      </div>
      <ul className="menu menu-horizontal">
        {session?.user !== undefined ? (
          <>
            <li>
              <Link href="/my-profile">Profilom</Link>
            </li>
            <li>
              <NotificationDropdown />
            </li>
            <li>
              <form
                action={async () => {
                  "use server";
                  await api.auth.user.logout();
                  revalidatePath("/");
                }}
              >
                <button type="submit">Kijelentkezés</button>
              </form>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Bejelentkezés</Link>
            </li>
            <li>
              <Link href="/register">Regisztráció</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
