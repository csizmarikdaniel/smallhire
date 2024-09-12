import LoginForm from "@/app/_components/auth/loginForm";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <div>
      <h1 className="text-center text-3xl">Bejelentkezés</h1>
      <LoginForm />
      <Link href="/register">Nincs még fiókod?</Link>
    </div>
  );
}
