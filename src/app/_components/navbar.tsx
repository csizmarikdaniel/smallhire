import { logout } from "@/utils/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">SmallHire</h1>
      </div>
      <ul className="menu menu-horizontal">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <form
          action={async () => {
            "use server";
            await logout();
            redirect("/");
          }}
        >
          <button type="submit">Logout</button>
        </form>
      </ul>
    </div>
  );
};

export default Navbar;
