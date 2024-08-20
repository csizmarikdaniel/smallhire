import LoginForm from "@/app/_components/auth/loginForm";
import { getSession } from "@/utils/auth";

export default function LoginPage() {
  const session = getSession();
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
