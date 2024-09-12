import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import ProfileCard from "../_components/profile/profile-card";
import TradesList from "../_components/profile/worker/trades-list";
//import ReferenceList from "../_components/profile/worker/reference-list";
import ReservationList from "../_components/profile/reservation-list";

const MyProfilePage = async () => {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="flex h-full w-full flex-col gap-5">
      <h1>Profilom</h1>
      <ProfileCard />
      {session.user.role === "WORKER" && (
        <>
          <TradesList />
          {/* <ReferenceList /> */}
        </>
      )}
      <ReservationList />
    </div>
  );
};

export default MyProfilePage;
