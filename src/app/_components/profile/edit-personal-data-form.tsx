import { api } from "@/trpc/react";
import Button from "../button";
import Input from "../form-components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema, type EditUserInput } from "@/types/profile";

const EditPersonalDataForm = ({
  defaultValues,
  open,
  setOpen,
}: {
  defaultValues: {
    id: string;
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const editPersonalData = api.profile.update.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      id: defaultValues.id,
      name: defaultValues.name,
      email: defaultValues.email,
      address: defaultValues.address,
      city: defaultValues.city,
      zipCode: defaultValues.zipCode,
      phone: defaultValues.phone,
    },
  });

  const onSubmit = async (data: EditUserInput) => {
    await editPersonalData.mutateAsync(data);
    setOpen(false);
  };
  return (
    <dialog open={open} className="modal">
      <div className="absolute h-screen w-screen bg-black/70" />
      <div className="modal-box flex flex-col gap-4 p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name")}
            label="Név"
            error={errors.name?.message}
          />
          <Input {...register("email")} label="Email" disabled />
          <Input
            {...register("address")}
            label="Cím"
            error={errors.address?.message}
          />
          <Input
            {...register("city")}
            label="Város"
            error={errors.city?.message}
          />
          <Input
            {...register("zipCode")}
            label="Irányítószám"
            error={errors.zipCode?.message}
          />
          <Input
            {...register("phone")}
            label="Telefonszám"
            error={errors.phone?.message}
          />
          <Input type="hidden" {...register("id")} />

          <div className="mt-6 flex justify-end gap-4">
            <Button type="submit" className="btn-primary">
              Megerősítés
            </Button>
            <Button type="button" onClick={() => setOpen(false)}>
              Mégse
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditPersonalDataForm;
