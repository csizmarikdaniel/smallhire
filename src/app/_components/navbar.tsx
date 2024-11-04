import { api } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import NotificationDropdown from "./notification-dropdown";
import AdminNavbar from "./admin/admin-navbar";

const Navbar = async () => {
  const session = await api.auth.getSession();
  return session?.user.role === "ADMIN" ? (
    <AdminNavbar />
  ) : (
    <div className="navbar sticky top-0 z-10 bg-gradient-to-b from-sky-600 to-transparent">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">
          <Link href="/">SmallHire</Link>
        </h1>
      </div>
      <ul className="menu menu-horizontal">
        <>
          <li>
            <Link href="/my-profile">Profilom</Link>
          </li>
          <li>
            <Link href="/reservation">Foglalásaim</Link>
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
      </ul>
    </div>
  );
};

export default Navbar;
