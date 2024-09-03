import { api } from "@/trpc/server";
import Input from "../form-components/input";
import Button from "../button";
import { redirect, RedirectType } from "next/navigation";

const LoginForm = () => {
  //TODO: error handling

  return (
    <form
      action={async (formData) => {
        "use server";
        const user = await api.auth.user.login({
          email: formData.get("email")?.toString() ?? "",
          password: formData.get("password")?.toString() ?? "",
        });
        if (user) {
          redirect("/", RedirectType.replace);
        }
      }}
      className="flex flex-col gap-5"
    >
      <Input label="Email" placeholder="Email" type="email" name="email" />
      <Input
        label="Password"
        placeholder="Password"
        type="password"
        name="password"
      />
      <Button type="submit">Bejelentkezés</Button>
    </form>
  );
};

export default LoginForm;
