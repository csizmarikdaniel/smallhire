import Button from "./button";
import CheckIcon from "./icons/check";
import RemoveIcon from "./icons/remove";

type NotificationCardProps = {
  notification: {
    id: string;
    title: string;
    description: string;
    seen: boolean;
    reservationId?: string | null;
  };
  onOpen: (id: string, reservationId?: string | null) => void;
  onClear: (id: string) => void;
  onDelete: (id: string) => void;
};

const NotificationCard = ({
  notification,
  onOpen,
  onClear,
  onDelete,
}: NotificationCardProps) => {
  return (
    <div
      key={notification.id}
      className={`m-0.5 flex items-center justify-between rounded-sm p-2 shadow-md ${notification.seen ? "bg-white" : "bg-gray-100"}`}
      onClick={() => {
        onOpen(notification.id, notification.reservationId);
      }}
    >
      <div>
        <p className="font-bold">{notification.title}</p>
        <p>{notification.description}</p>
      </div>
      <div className="flex">
        {!notification.seen && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClear(notification.id);
            }}
          >
            <CheckIcon height={20} width={20} />
          </Button>
        )}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(notification.id);
          }}
        >
          <RemoveIcon height={20} width={20} />
        </Button>
      </div>
    </div>
  );
};

export default NotificationCard;
