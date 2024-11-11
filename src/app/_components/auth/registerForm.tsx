"use client";

import { api } from "@/trpc/react";
import { RegisterSchema } from "@/types/auth";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Input from "../form-components/input";
import Button from "../button";
import { useRouter } from "next/navigation";
import Radio from "../form-components/radio";
import bcrypt from "bcryptjs";

type FormValues = z.infer<typeof RegisterSchema>;

const defaultValues: FormValues = {
  email: "",
  name: "",
  password: "",
  role: "CUSTOMER",
  address: "",
  city: "",
  zipCode: "",
  phone: "",
};

const RegisterForm = () => {
  const registerMutation = api.auth.user.register.useMutation({
    onError: (error) => {
      if (error.message === "Ez az email cím már használatban van!") {
        setEmailError(error.message);
      } else {
        setError("Ismeretlen hiba történt! Kérjük próbálja újra!");
      }
    },
    onSuccess: () => {
      router.push("/login");
    },
  });
  const router = useRouter();
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (values: FormValues) => {
    values.password = bcrypt.hashSync(values.password, 10);
    registerMutation.mutate(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex justify-center">
        <Radio label="Megrendelő" value="CUSTOMER" {...register("role")} />
        <Radio label="Szakember" value="WORKER" {...register("role")} />
      </div>
      <div className="grid grid-cols-2 items-center gap-5">
        <div className="flex flex-col">
          <Input
            label="Email"
            error={errors.email?.message ?? emailError}
            {...register("email")}
          />
          <Input
            label="Név"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Jelszó"
            error={errors.password?.message}
            {...register("password")}
            type="password"
          />
        </div>
        <div>
          <Input
            label="Cím"
            error={errors.address?.message}
            {...register("address")}
          />
          <Input
            label="Város"
            error={errors.city?.message}
            {...register("city")}
          />
          <Input
            label="Irányítószám"
            error={errors.zipCode?.message}
            {...register("zipCode")}
          />
          <Input
            label="Telefonszám"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Regisztráció</Button>
    </form>
  );
};

export default RegisterForm;
