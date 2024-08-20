"use client";

import { api } from "@/trpc/react";
import { RegisterSchema } from "@/types/auth";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

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
        <input {...register("email")} placeholder="Email" />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <input {...register("name")} placeholder="Name" />
        {errors.name && <span>{errors.name.message}</span>}
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        {errors.password && <span>{errors.password.message}</span>}
        <select {...register("role")}>
          <option value="customer">Customer</option>
          <option value="worker">Worker</option>
        </select>
        {errors.role && <span>{errors.role.message}</span>}
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
