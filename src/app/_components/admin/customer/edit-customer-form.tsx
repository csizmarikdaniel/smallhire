import { type EditUserInput, EditUserSchema } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../../form-components/input";
import Button from "../../button";

const EditCustomerForm = ({
  defaultValues,
  setIsEditing,
  onEdit,
}: {
  defaultValues: EditUserInput;
  setIsEditing: (value: boolean) => void;
  onEdit: (values: EditUserInput) => void;
}) => {
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
    <form
      onSubmit={handleSubmit(onEdit)}
      className="my-5 grid grid-cols-3 rounded-lg bg-white p-5 shadow-md"
    >
      <div>
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
      </div>
      <div>
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
          label="Irányítószam"
          error={errors.zipCode?.message}
        />
      </div>
      <div className="justify-self-end">
        <Button type="submit">Mentés</Button>
        <Button onClick={() => setIsEditing(false)}>Mégse</Button>
      </div>
    </form>
  );
};

export default EditCustomerForm;
