import RegisterForm from "@/app/_components/auth/registerForm";
import Link from "next/link";

export default async function RegisterPage() {
  return (
    <div>
      <h1 className="text-center text-3xl">Regisztráció</h1>
      <RegisterForm />
      <Link href="/login">Van már fiókod?</Link>
    </div>
  );
}
