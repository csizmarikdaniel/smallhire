import { type EditUserInput, EditUserSchema } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../../form-components/input";
import Button from "../../button";

type EditWorkerFormProps = {
  defaultValues: EditUserInput;
  onSubmit: (values: EditUserInput) => void;
  onClose: () => void;
};

const EditWorkerForm = ({
  defaultValues,
  onSubmit,
  onClose,
}: EditWorkerFormProps) => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("id")} type="hidden" />
      <Input {...register("name")} label="Név" error={errors.name?.message} />
      <Input
        {...register("email")}
        label="Email"
        error={errors.email?.message}
      />
      <Input
        {...register("phone")}
        label="Telefonszám"
        error={errors.phone?.message}
      />
      <Input
        {...register("address")}
        label="Cím"
        error={errors.address?.message}
      />
      <Input {...register("city")} label="Város" error={errors.city?.message} />
      <Input
        {...register("zipCode")}
        label="Irányítószám"
        error={errors.zipCode?.message}
      />
      <Button type="submit">Mentés</Button>
      <Button onClick={onClose}>Mégse</Button>
    </form>
  );
};

export default EditWorkerForm;
