import { api } from "@/trpc/server";
import Link from "next/link";
import NotificationDropdown from "./notification-dropdown";

const Navbar = async () => {
  return (
    <div className="navbar sticky top-0 z-10 bg-gradient-to-b from-sky-600 via-sky-600 via-75% to-transparent pb-4 text-white">
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
                api.auth.getSession();
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
