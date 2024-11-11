import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../../form-components/input";
import Button from "../../button";
import {
  AdminEditProfileSchema,
  type AdminEditProfileInput,
} from "@/types/admin";

type EditWorkerFormProps = {
  defaultValues: AdminEditProfileInput;
  onSubmit: (values: AdminEditProfileInput) => void;
  onClose: () => void;
  error: string | undefined;
};

const EditWorkerForm = ({
  defaultValues,
  onSubmit,
  onClose,
  error,
}: EditWorkerFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AdminEditProfileSchema),
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
      {error && <div className="mt-5 text-red-500">{error}</div>}
      <Button type="submit">Mentés</Button>
      <Button onClick={onClose}>Mégse</Button>
    </form>
  );
};

export default EditWorkerForm;
