import { redirect } from "next/navigation";
import ProfileCard from "../_components/profile/profile-card";
import TradesList from "../_components/profile/worker/trade/trades-list";
import ReferenceList from "../_components/profile/worker/reference/reference-list";
import ReservationList from "../_components/profile/reservation-list";
import { api } from "@/trpc/server";

const MyProfilePage = async () => {
  const session = await api.auth.getSession();
  if (!session) redirect("/login");
  return (
    <div className="my-5 flex h-full w-full flex-col gap-5">
      <h1 className="text-center text-3xl">Profilom</h1>
      <ProfileCard />
      {session.user.role === "WORKER" && (
        <>
          <TradesList />
          <ReferenceList />
        </>
      )}
      <ReservationList />
    </div>
  );
};

export default MyProfilePage;
