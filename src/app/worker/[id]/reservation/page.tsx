import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const ReservationPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Reservation Page</h1>
    </div>
  );
};

export default ReservationPage;
