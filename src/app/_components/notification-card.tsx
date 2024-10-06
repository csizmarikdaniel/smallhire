import Link from "next/link";
import DotIcon from "./icons/dot";

type NotificationCardProps = {
  notification: {
    id: string;
    title: string;
    description: string;
    seen: boolean;
    reservationId?: string | null;
  };
  onOpen: (id: string) => void;
};

const NotificationCard = ({ notification, onOpen }: NotificationCardProps) => {
  return (
    <Link
      href={
        notification.reservationId
          ? `/reservation/${notification.reservationId}`
          : "/my-profile"
      }
      key={notification.id}
      onClick={() => {
        onOpen(notification.id);
      }}
    >
      <div
        key={notification.id}
        className="m-0.5 flex items-center justify-between rounded-sm shadow-md"
      >
        <div>
          <p>{notification.title}</p>
          <p>{notification.description}</p>
        </div>
        {!notification.seen && (
          <DotIcon width={50} height={50} color="#FF0000" />
        )}
      </div>
    </Link>
  );
};

export default NotificationCard;
