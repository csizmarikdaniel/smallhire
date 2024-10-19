"use client";

import { useState } from "react";
import NotificationCard from "./notification-card";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

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

  const setToSeen = api.notification.setToSeen.useMutation({
    onSuccess: async () => {
      await notifications.refetch();
    },
  });

  const deleteNotification = api.notification.delete.useMutation({
    onSuccess: async () => {
      await notifications.refetch();
    },
  });

  const onOpen = (id: string, reservationId?: string) => {
    setOpen(!open);
    router.push(
      reservationId ? `/reservation/${reservationId}` : "/my-profile",
    );
    setToSeen.mutate({ notificationId: id });
  };

  const onClear = (id: string) => {
    setToSeen.mutate({ notificationId: id });
  };

  const onDelete = (id: string) => {
    deleteNotification.mutate({ notificationId: id });
  };

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
            onClick={() => setOpen(false)}
          ></div>
          <div className="absolute right-0 top-10 min-w-96 rounded-sm bg-white p-4 shadow-lg">
            {notifications.data?.length !== 0 ? (
              notifications.data?.map((noti) => (
                <NotificationCard
                  notification={noti}
                  key={noti.id}
                  onOpen={onOpen}
                  onClear={onClear}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <p>Nincs új értesítés</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
