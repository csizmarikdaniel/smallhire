import { useForm } from "react-hook-form";
import Input from "../../../form-components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { type AddTradeInput, AddTradeSchema } from "@/types/worker";
import Button from "../../../button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { setNumberValueAs } from "@/utils/form-value-conversion";

const AddTradeModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const addTrade = api.worker.trades.add.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddTradeInput>({
    resolver: zodResolver(AddTradeSchema),
    defaultValues: {
      name: "",
      yearsOfExperience: 0,
      pricePerHour: 0,
    },
  });

  const onSubmit = async (data: AddTradeInput) => {
    addTrade.mutate(data);
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
            {...register("yearsOfExperience", { setValueAs: setNumberValueAs })}
            label="Évek száma"
            type="number"
            error={errors.yearsOfExperience?.message}
          />
          <Input
            {...register("pricePerHour", { setValueAs: setNumberValueAs })}
            label="Óradíj"
            type="number"
            error={errors.pricePerHour?.message}
          />

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

export default AddTradeModal;
