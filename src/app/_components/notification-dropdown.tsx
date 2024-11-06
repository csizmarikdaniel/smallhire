"use client";

import { useState } from "react";
import NotificationCard from "./notification-card";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import NotificationList from "./notification-list";

const NotificationDropdown = () => {
  const notifications = api.notification.getAll.useQuery();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  if (notifications.error) {
    router.push("/login");
  }
  const unSeenCount = notifications.data?.reduce((acc, noti) => {
    if (!noti.seen) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>Értesítések</button>
      {notifications.data?.length !== 0 && unSeenCount !== 0 && (
        <div className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-white">
          {unSeenCount}
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
            className="absolute right-0 top-10 w-96"
          />
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
