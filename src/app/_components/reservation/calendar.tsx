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
  const reservedDays = api.customer.worker.reservation.list.useQuery({
    workerId: id,
  });

  const reservedDaysMap = reservedDays.data?.reduce((acc, reservation) => {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    const days = [];
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date));
    }
    return [...acc, ...days];
  }, [] as Date[]);

  return (
    <DayPicker
      mode="range"
      selected={selectedDays}
      onSelect={setSelectedDays}
      disabled={reservedDaysMap}
      required={true}
      modifiersClassNames={{
        disabled: "line-through",
      }}
    />
  );
};

export default Calendar;
