import RegisterForm from "@/app/_components/auth/registerForm";
import Loading from "@/app/_components/loading";
import Link from "next/link";
import { Suspense } from "react";

const RegisterPage = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-auto mt-28 max-w-[1000px] rounded-lg bg-white p-5">
        <h1 className="mb-5 text-center text-4xl">Regisztráció</h1>
        <RegisterForm />
      </div>
      <div className="mx-auto mt-5 flex justify-center gap-8">
        <Link href="/login" className="text-sky-700 underline">
          Van már fiókod?
        </Link>
        <Link href={"/"} className="text-sky-700 underline">
          Vissza a főoldalra
        </Link>
      </div>
    </Suspense>
  );
};

export default RegisterPage;
