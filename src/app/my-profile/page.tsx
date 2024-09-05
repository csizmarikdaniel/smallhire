import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import ProfileCard from "../_components/profile/profile-card";
import TradesList from "../_components/profile/trades-list";

const MyProfilePage = async () => {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <div className="h-full w-full">
      <h1>Profilom</h1>
      <ProfileCard />
      {session.user.role === "WORKER" ? (
        <TradesList workerId={session.user.id} />
      ) : null}
    </div>
  );
};

export default MyProfilePage;
