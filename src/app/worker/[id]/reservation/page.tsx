import ReservationForm from "@/app/_components/reservation/reservation-form";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { type DateRange } from "react-day-picker";

const ReservationPage = async () => {
  const session = await api.auth.getSession();
  if (!session) {
    redirect("/login");
  }
  const onReservation = async (formData: FormData, selectedDays: DateRange) => {
    "use server";
    const result = await api.reservation.create({
      endDate: selectedDays.to,
      formData: formData,
      startDate: selectedDays.from!,
    });
    redirect("/reservation/" + result);
  };
  return (
    <div>
      <h1>Foglalás</h1>
      <ReservationForm onReservation={onReservation} />
    </div>
  );
};

export default ReservationPage;
