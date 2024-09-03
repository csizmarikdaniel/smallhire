"use client";

import { api } from "@/trpc/react";
import { RegisterSchema } from "@/types/auth";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Input from "../form-components/input";
import Select from "../form-components/select";
import Button from "../button";

type FormValues = z.infer<typeof RegisterSchema>;

const defaultValues: FormValues = {
  email: "",
  name: "",
  password: "",
  role: "customer",
};

const RegisterForm = () => {
  const registerMutation = api.auth.user.register.useMutation();

  const {
    register,
    handleSubmit,
    reset,
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
      reset(defaultValues);
    }
  }, [registerMutation.isSuccess, reset]);
  //TODO: zod validation
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <Input
          label="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input label="Név" error={errors.name?.message} {...register("name")} />
        <Input
          label="Jelszó"
          error={errors.password?.message}
          {...register("password")}
          type="password"
        />
        <Select
          label="Szerep"
          options={[
            { value: "customer", label: "Customer" },
            { value: "worker", label: "Szakember" },
          ]}
          error={errors.role?.message}
          {...register("role")}
        />
        <Button type="submit">Regisztráció</Button>
      </div>
    </form>
  );
};

export default RegisterForm;
