"use client";

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../_components/button";

const Schema = z.object({
  file: z.custom<File>(),
});

type FormValues = z.infer<typeof Schema>;

const FileTestPage = () => {
  const upload = api.file.upload.useMutation();

  const [file, setFile] = useState<File | undefined>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    upload.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FileTestPage;
