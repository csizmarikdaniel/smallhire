import LoginForm from "@/app/_components/auth/loginForm";
import { api } from "@/trpc/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await api.auth.getSession();
  if (session) {
    if (session.user.role === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/");
    }
  }
  return (
    <div className="mx-auto mt-10 max-w-[1000px] rounded-lg bg-white p-5">
      <h1 className="text-center text-3xl">Bejelentkezés</h1>
      <LoginForm />
      <Link href="/register" className="text-sky-700 underline">
        Nincs még fiókod?
      </Link>
    </div>
  );
}
