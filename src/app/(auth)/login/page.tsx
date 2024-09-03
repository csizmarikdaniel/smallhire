import LoginForm from "@/app/_components/auth/loginForm";

export default async function LoginPage() {
  return (
    <div>
      <h1 className="text-center text-3xl">Bejelentkezés</h1>
      <LoginForm />
    </div>
  );
}
