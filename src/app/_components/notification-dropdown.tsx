"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import NotificationList from "./notification-list";

const NotificationDropdown = () => {
  const unSeenCount = api.notification.unseenNotificationsCount.useQuery();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>Értesítések</button>
      {unSeenCount.data !== undefined && (
        <div className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-white">
          {unSeenCount.data}
        </div>
      )}
      {open && (
        <>
          <div
            className="fixed left-0 top-0 h-full w-full"
            onClick={() => setOpen !== undefined && setOpen(false)}
          ></div>
          <NotificationList
            setOpen={setOpen}
            className="absolute right-0 top-10 w-96 text-black"
          />
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
