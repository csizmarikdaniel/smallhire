"use client";

import Input from "../form-components/input";
import Button from "../button";
import { useState } from "react";

type LoginFormProps = {
  onLogin: (formData: FormData) => Promise<void>;
};

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        if (!formData.get("email") || !formData.get("password")) {
          setError("Minden mezőt ki kell tölteni!");
          return;
        }
        try {
          await onLogin(formData);
        } catch (error) {
          if (error instanceof Error) {
            if (
              error.message.startsWith("[") &&
              JSON.parse(error.message) instanceof Array
            ) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
              setError(JSON.parse(error.message)[0].message);
            } else {
              setError(error.message);
            }
          }
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
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Bejelentkezés</Button>
    </form>
  );
};

export default LoginForm;
