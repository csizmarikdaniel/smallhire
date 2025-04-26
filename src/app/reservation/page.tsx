import { api } from "@/trpc/server";
import ReservationList from "../_components/profile/reservation-list";
import { redirect } from "next/navigation";

type ReservationsPageProps = {
  searchParams: {
    search?: string;
    status?: string;
  };
};

const ReservationsPage = async ({ searchParams }: ReservationsPageProps) => {
  const session = await api.auth.getSession();
  if (!session) {
    redirect("/login");
  }

  const statusArray = searchParams.status?.split(",") ?? undefined;
  return <ReservationList search={searchParams.search} status={statusArray} />;
};

export default ReservationsPage;
