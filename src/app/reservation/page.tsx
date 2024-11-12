import { api } from "@/trpc/server";
import ReservationList from "../_components/profile/reservation-list";
import { redirect } from "next/navigation";

const ReservationsPage = async () => {
  const session = await api.auth.getSession();
  if (!session) {
    redirect("/login");
  }
  return <ReservationList />;
};

export default ReservationsPage;
