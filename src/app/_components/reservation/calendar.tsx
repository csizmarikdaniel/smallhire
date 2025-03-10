import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const Calendar = ({
  selectedDays,
  setSelectedDays,
}: {
  selectedDays: DateRange | undefined;
  setSelectedDays: (selectedDays: DateRange) => void;
}) => {
  const params = useParams();
  const id = params.id?.toString() ?? "";
  const reservedDays = api.worker.reservedDays.useQuery({
    workerId: id,
  });

  return (
    <DayPicker
      mode="range"
      selected={selectedDays}
      onSelect={setSelectedDays}
      required={true}
      disabled={{ before: new Date() }}
      modifiers={{
        booked: reservedDays.data,
      }}
      modifiersClassNames={{
        disabled: "text-gray-400",
        booked: "line-through",
      }}
      onDayClick={(date, modifiers) => {
        if (modifiers.booked) {
          alert("Ez a nap már le van foglalva");
          setSelectedDays({ from: undefined, to: undefined });
        }
      }}
    />
  );
};

export default Calendar;
