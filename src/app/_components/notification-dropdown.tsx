"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import { useState } from "react";
import DotIcon from "./icons/dot";

const NotificationDropdown = () => {
  const notifications = api.notification.getAll.useQuery();
  const setToSeen = api.notification.setToSeen.useMutation();
  const [open, setOpen] = useState(false);
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
        <div className="absolute right-0 top-10 min-w-96 rounded-sm bg-white p-4 shadow-lg">
          {notifications.data?.length !== 0 ? (
            notifications?.data?.map((noti) => (
              <Link
                href={`/reservation/${noti.reservationId}`}
                key={noti.id}
                onClick={() => {
                  !noti.seen && setToSeen.mutate({ notificationId: noti.id });
                  setOpen(false);
                }}
              >
                <div
                  key={noti.id}
                  className="m-0.5 flex items-center justify-between rounded-sm shadow-md"
                >
                  <div>
                    <p>{noti.title}</p>
                    <p>{noti.description}</p>
                  </div>
                  {!noti.seen && (
                    <DotIcon width={50} height={50} color="#FF0000" />
                  )}
                </div>
              </Link>
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
