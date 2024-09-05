import { api } from "@/trpc/server";
import EditPersonalData from "./edit-personal-data";

const ProfileCard = async ({ className }: { className?: string }) => {
  const user = await api.profile.get();
  return (
    <div className={className}>
      <div className="mx-auto max-w-[1000px] rounded-lg p-5 shadow-xl">
        <h1 className="text-center text-3xl">{user?.name}</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <p className="font-bold">Email:</p>
            <p>{user?.email}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Telefonszám:</p>
            <p>{user?.phone}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Cím:</p>
            <p>{user?.address}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Város:</p>
            <p>{user?.city}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Irányítószám:</p>
            <p>{user?.zipCode}</p>
          </div>
        </div>
        <EditPersonalData />
      </div>
    </div>
  );
};

export default ProfileCard;
