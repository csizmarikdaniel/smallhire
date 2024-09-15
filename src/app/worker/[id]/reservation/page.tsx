import ReservationForm from "@/app/_components/reservation/reservation-form";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const ReservationPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Foglalás</h1>
      <ReservationForm sessionUser={session.user} />
    </div>
  );
};

export default ReservationPage;
