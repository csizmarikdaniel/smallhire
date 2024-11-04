import RegisterForm from "@/app/_components/auth/registerForm";
import Link from "next/link";

export default async function RegisterPage() {
  return (
    <div className="mx-auto mt-10 max-w-[1000px] rounded-lg bg-white p-5">
      <h1 className="mb-5 text-center text-3xl">Regisztráció</h1>
      <RegisterForm />
      <Link href="/login" className="text-sky-700 underline">
        Van már fiókod?
      </Link>
    </div>
  );
}
