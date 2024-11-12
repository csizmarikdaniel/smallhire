import { api } from "@/trpc/server";
import { redirect, RedirectType } from "next/navigation";
import Link from "next/link";

const AdminNavbar = async () => {
  return (
    <div className="navbar sticky top-0 z-10 bg-gradient-to-b from-sky-600 via-sky-600 via-75% to-transparent pb-4 text-white">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">
          <Link href="/admin">SmallHire Admin</Link>
        </h1>
      </div>
      <ul className="menu menu-horizontal">
        <li>
          <Link href="/admin/workers">Szakemberek</Link>
        </li>
        <li>
          <Link href="/admin/customers">Megrendelők</Link>
        </li>
        <li>
          <Link href="/admin/reservations">Foglalások</Link>
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
      </ul>
    </div>
  );
};

export default AdminNavbar;
