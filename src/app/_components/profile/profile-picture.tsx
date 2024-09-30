"use client";

import { api } from "@/trpc/react";
import Image from "next/image";
import { useState } from "react";
import EditProfilePicture from "./edit-profile-picture";
import AddImageIcon from "../icons/add-image";
import EditIcon from "../icons/edit";

const ProfilePicture = ({
  onupload,
}: {
  onupload: (formdata: FormData) => Promise<void>;
}) => {
  const image = api.profile.image.get.useQuery();
  const [open, setOpen] = useState(false);

  return (
    <div>
      {image.data?.image ? (
        <div className="relative mx-auto w-fit">
          <Image
            src={`https://utfs.io/f/${image.data?.image}`}
            alt="Profilkép"
            width={200}
            height={200}
          />
          <div
            className="absolute -right-3 -top-3 rounded-full bg-slate-200 p-2 transition-all duration-300 hover:bg-slate-300"
            onClick={() => setOpen(true)}
          >
            <EditIcon height={20} width={20} />
          </div>
        </div>
      ) : (
        <div
          className="mx-auto w-fit items-center rounded-full bg-gray-300 p-6 text-center text-8xl text-white transition-all duration-300 hover:bg-gray-400"
          onClick={() => setOpen(true)}
        >
          <AddImageIcon />
        </div>
      )}
      <EditProfilePicture open={open} setOpen={setOpen} onupload={onupload} />
    </div>
  );
};

export default ProfilePicture;
