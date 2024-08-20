"use client";

import { api } from "@/trpc/react";
import { LoginSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type FormValues = z.infer<typeof LoginSchema>;

const defaultValues: FormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const login = api.auth.user.login.useMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: FormValues) => {
    login.mutate({ email: values.email, password: values.password });
    reset();
    router.push("/login");
  };

  //TODO: error handling

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}
      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}
      <input type="submit" />
    </form>
  );
};

export default LoginForm;
