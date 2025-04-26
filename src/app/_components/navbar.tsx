import { api } from "@/trpc/server";
import Link from "next/link";
import NotificationDropdown from "./notification-dropdown";

const Navbar = async () => {
  const session = await api.auth.getSession();
  if (!session) {
    return (
      <div className="navbar absolute top-0 z-10 bg-gradient-to-b from-sky-700 via-sky-700 via-75% to-transparent pb-4 text-white">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            <Link href="/">SmallHire</Link>
          </h1>
        </div>
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/login">Bejelentkezés</Link>
          </li>
          <li>
            <Link href="/register">Regisztráció</Link>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="navbar sticky top-0 z-10 bg-gradient-to-b from-sky-700 via-sky-700 via-75% to-transparent pb-4 text-white">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">
          <Link href="/">SmallHire</Link>
        </h1>
      </div>
      <ul className="menu menu-horizontal">
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
              await api.auth.getSession();
            }}
          >
            <button type="submit">Kijelentkezés</button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
