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
import { useRouter } from "next/navigation";

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
      router.push("/login");
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
        <Select
          label="Szerep"
          options={[
            { value: "CUSTOMER", label: "Megrendelő" },
            { value: "WORKER", label: "Szakember" },
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
