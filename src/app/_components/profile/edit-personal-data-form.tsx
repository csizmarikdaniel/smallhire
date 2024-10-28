import { api } from "@/trpc/react";
import Input from "../form-components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema, type EditUserInput } from "@/types/profile";
import Modal from "../modal";

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
  const editPersonalData = api.profile.update.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

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
    editPersonalData.mutate(data);
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      type="client"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input {...register("name")} label="Név" error={errors.name?.message} />
      <Input {...register("email")} label="Email" disabled />
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
      <Input
        {...register("phone")}
        label="Telefonszám"
        error={errors.phone?.message}
      />
      <Input type="hidden" {...register("id")} />
    </Modal>
  );
};

export default EditPersonalDataForm;
