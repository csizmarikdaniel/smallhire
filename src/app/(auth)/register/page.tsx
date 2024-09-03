import RegisterForm from "@/app/_components/auth/registerForm";

export default async function RegisterPage() {
  return (
    <div>
      <h1 className="text-center text-3xl">Regisztráció</h1>
      <RegisterForm />
    </div>
  );
}
