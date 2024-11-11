import { api } from "@/trpc/react";
import Button from "../../../button";
import Input from "../../../form-components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditTradeSchema, type EditTradeInput } from "@/types/worker";
import { setNumberValueAs } from "@/utils/form-value-conversion";
import { useState } from "react";
import Modal from "@/app/_components/modal";

type EditTradeProps = {
  trade: {
    id: string;
    name: string;
    yearsOfExperience: number;
    pricePerHour: number;
  };
};

const EditTrade = ({ trade }: EditTradeProps) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const editTrade = api.worker.trades.edit.useMutation({
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
  } = useForm<EditTradeInput>({
    resolver: zodResolver(EditTradeSchema),
    defaultValues: {
      id: trade.id,
      name: trade.name,
      yearsOfExperience: trade.yearsOfExperience,
      pricePerHour: trade.pricePerHour,
    },
  });

  const onSubmit = async (data: EditTradeInput) => {
    editTrade.mutate(data);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Módosítás</Button>
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
          label="Óradíj (Ft/óra)"
          type="number"
          error={errors.pricePerHour?.message}
        />
        <Input type="hidden" {...register("id")} />
        {error && <p className="mt-5 text-red-500">{error}</p>}
      </Modal>
    </>
  );
};

export default EditTrade;
