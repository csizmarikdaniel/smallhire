import LoginForm from "@/app/_components/auth/loginForm";
import Loading from "@/app/loading";
import { api } from "@/trpc/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage() {
  const session = await api.auth.getSession();
  if (session) {
    if (session.user.role === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/");
    }
  }

  const onLogin = async (formData: FormData) => {
    "use server";
    await api.auth.user.login({
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    });
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-auto mt-10 max-w-[1000px] rounded-lg bg-white p-5">
        <h1 className="text-center text-3xl">Bejelentkezés</h1>
        <LoginForm onLogin={onLogin} />
        <Link href="/register" className="text-sky-700 underline">
          Nincs még fiókod?
        </Link>
      </div>
      <div className="mt-5 text-center">
        <Link href={"/"} className="text-sky-700 underline">
          Vissza a főoldalra
        </Link>
      </div>
    </Suspense>
  );
}
