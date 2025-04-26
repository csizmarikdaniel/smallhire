import { api } from "@/trpc/server";
import EditPersonalData from "./edit-personal-data";
import ProfilePicture from "./profile-picture";

const ProfileCard = async () => {
  const user = await api.profile.get();
  const onupload = async (formData: FormData) => {
    "use server";
    try {
      const { success } = await api.profile.image.edit(formData);
      return success;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  return (
    <div>
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 p-5 md:grid-cols-3">
        <div>
          <ProfilePicture onupload={onupload} />
        </div>
        <div className="divide-y-2 md:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h1 className="text-3xl">{user?.name}</h1>
            <div className="text-center">
              {user && <EditPersonalData data={user} />}
            </div>
          </div>
          <div className="flex w-full flex-row pt-5">
            <div className="basis-1/4">
              <p className="text-gray-400">Email:</p>
              <p className="text-gray-400">Telefonszám:</p>
              <p className="text-gray-400">Cím:</p>
              <p className="text-gray-400">Város:</p>
              <p className="text-gray-400">Irányítószám:</p>
            </div>
            <div>
              <p>{user?.email}</p>
              <p>{user?.phone}</p>
              <p>{user?.address}</p>
              <p>{user?.city}</p>
              <p>{user?.zipCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
