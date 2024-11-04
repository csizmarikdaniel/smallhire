import { api } from "@/trpc/server";
import EditPersonalData from "./edit-personal-data";
import ProfilePicture from "./profile-picture";

const ProfileCard = async () => {
  const user = await api.profile.get();
  const onupload = async (formData: FormData) => {
    "use server";
    await api.profile.image.edit(formData);
  };
  return (
    <div>
      <div className="mx-auto max-w-[1000px] rounded-lg bg-white p-5 shadow-xl">
        <h1 className="mb-10 text-center text-3xl">{user?.name}</h1>
        <ProfilePicture onupload={onupload} />
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
        {user && <EditPersonalData data={user} />}
      </div>
    </div>
  );
};

export default ProfileCard;
