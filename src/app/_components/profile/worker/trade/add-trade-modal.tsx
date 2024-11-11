import { useForm } from "react-hook-form";
import Input from "../../../form-components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { type AddTradeInput, AddTradeSchema } from "@/types/worker";
import { api } from "@/trpc/react";
import { setNumberValueAs } from "@/utils/form-value-conversion";
import Modal from "@/app/_components/modal";
import { useState } from "react";

const AddTradeModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [error, setError] = useState<string | undefined>();
  const addTrade = api.worker.trades.add.useMutation({
    onSuccess: () => {
      setOpen(false);
      window.location.reload();
    },
    onError: (error) => {
      setError(error.message);
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
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!error) setOpen(false);
      }}
      onCancel={() => setOpen(false)}
      type="client"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input {...register("name")} label="Név" error={errors.name?.message} />
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
      {error && <p className="mt-5 text-red-500">{error}</p>}
    </Modal>
  );
};

export default AddTradeModal;
