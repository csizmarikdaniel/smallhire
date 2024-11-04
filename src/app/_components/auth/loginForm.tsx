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
        try {
          await api.auth.user.login({
            email: formData.get("email")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
          });
        } catch (error) {
          console.error(error);
        }
        const session = await api.auth.getSession();
        if (session?.user.role === "ADMIN") {
          redirect("/admin", RedirectType.replace);
        } else {
          redirect("/", RedirectType.replace);
        }
      }}
      className="flex flex-col gap-5"
    >
      <Input label="Email" placeholder="Email" type="email" name="email" />
      <Input
        label="Jelszó"
        placeholder="Jelszó"
        type="password"
        name="password"
      />
      <Button type="submit">Bejelentkezés</Button>
    </form>
  );
};

export default LoginForm;
