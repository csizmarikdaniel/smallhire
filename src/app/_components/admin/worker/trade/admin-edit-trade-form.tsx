import Button from "@/app/_components/button";
import Input from "@/app/_components/form-components/input";
import { type EditTradeInput, EditTradeSchema } from "@/types/worker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type AdminEditTradeFormProps = {
  defaultValues: EditTradeInput;
  onCancel: () => void;
  onEdit: (data: EditTradeInput) => void;
};

const AdminEditTradeForm = ({
  defaultValues,
  onCancel,
  onEdit,
}: AdminEditTradeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTradeInput>({
    resolver: zodResolver(EditTradeSchema),
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onEdit)}>
      <Input {...register("id")} type="hidden" />
      <Input {...register("name")} label="Név" error={errors.name?.message} />
      <Input
        {...register("yearsOfExperience")}
        label="Tapasztalat"
        error={errors.yearsOfExperience?.message}
        type="number"
      />
      <Button type="submit">Mentés</Button>
      <Button onClick={onCancel}>Mégse</Button>
    </form>
  );
};

export default AdminEditTradeForm;
