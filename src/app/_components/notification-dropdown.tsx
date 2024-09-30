"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

const NotificationDropdown = () => {
  const notifications = api.notification.getAll.useQuery();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>Értesítések</button>
      {notifications.data?.length !== 0 && (
        <div className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-white">
          {notifications.data?.length}
        </div>
      )}
      {open && (
        <div className="absolute right-0 top-10 min-w-96 rounded-sm bg-white p-4 shadow-lg">
          {notifications.data?.length !== 0 ? (
            notifications?.data?.map((noti) => (
              <div key={noti.id} className="m-0.5 rounded-sm shadow-md">
                <p>{noti.title}</p>
                <p>{noti.description}</p>
              </div>
            ))
          ) : (
            <p>Nincs új értesítés</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
