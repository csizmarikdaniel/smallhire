import { api } from "@/trpc/react";
import Button from "../../../button";
import Input from "../../../form-components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema } from "@/types/profile";
import { useRouter } from "next/navigation";
import { type EditTradeInput } from "@/types/worker";

const EditTradeForm = ({
  defaultValues,
  open,
  setOpen,
}: {
  defaultValues: { id: string; name: string; yearsOfExperience: number };
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const editTrade = api.worker.trades.edit.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      id: defaultValues.id,
      name: defaultValues.name,
      yearsOfExperience: defaultValues.yearsOfExperience,
    },
  });

  const onSubmit = async (data: EditTradeInput) => {
    editTrade.mutate(data);
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
          <Input
            {...register("yearsOfExperience")}
            label="Évek száma"
            type="number"
            error={errors.yearsOfExperience?.message}
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

export default EditTradeForm;
