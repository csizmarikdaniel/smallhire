"use client";

import { api } from "@/trpc/react";
import NotificationCard from "./notification-card";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

type NotificationListProps = {
  setOpen?: (value: boolean) => void;
  className?: string;
};

const NotificationList = ({ setOpen, className }: NotificationListProps) => {
  const router = useRouter();
  const notifications = api.notification.getAll.useQuery();
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

  const onOpen = (id: string, reservationId?: string | null) => {
    setOpen !== undefined && setOpen(!open);
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
    <div
      className={twMerge(
        "min-w-30 flex max-h-96 flex-col overflow-y-scroll rounded-lg bg-white p-4 shadow-lg",
        className,
      )}
    >
      {notifications.data ? (
        notifications.data?.length !== 0 ? (
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
        )
      ) : (
        <span className="loading loading-dots"></span>
      )}
    </div>
  );
};

export default NotificationList;
