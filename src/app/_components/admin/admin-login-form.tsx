import { api } from "@/trpc/server";
import Button from "../button";
import Input from "../form-components/input";
import { redirect, RedirectType } from "next/navigation";

const AdminLoginForm = () => {
  return (
    <form
      action={async (formData) => {
        "use server";
        try {
          await api.admin.login({
            email: formData.get("email")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
          });
        } catch (error) {
          console.error(error);
        }

        redirect("/admin", RedirectType.replace);
      }}
    >
      <Input type="text" name="email" label="Email" />
      <Input type="password" name="password" label="Jelszó" />
      <Button type="submit">Bejelentkezés</Button>
    </form>
  );
};

export default AdminLoginForm;
