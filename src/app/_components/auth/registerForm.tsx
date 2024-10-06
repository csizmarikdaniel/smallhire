"use client";

import { api } from "@/trpc/react";
import { RegisterSchema } from "@/types/auth";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Input from "../form-components/input";
import Button from "../button";
import { useRouter } from "next/navigation";
import Radio from "../form-components/radio";

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
  const registerMutation = api.auth.user.register.useMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (values: FormValues) => {
    registerMutation.mutate(values);
  };

  useEffect(() => {
    if (registerMutation.isSuccess) {
      router.push("/login");
    }
  }, [registerMutation, router]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Radio label="Megrendelő" value="CUSTOMER" {...register("role")} />
      <Radio label="Szakember" value="WORKER" {...register("role")} />
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <Input
            label="Email"
            error={errors.email?.message}
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
      <Button type="submit">Regisztráció</Button>
    </form>
  );
};

export default RegisterForm;
