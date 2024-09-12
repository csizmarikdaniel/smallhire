import Link from "next/link";
import Button from "../button";
import ReservationStatusTag from "./reservation-status-tag";

const ReservationCard = ({
  reservation,
}: {
  reservation: {
    name: string;
    startDate: Date;
    endDate: Date;
    status: string;
    id: string;
  };
}) => {
  return (
    <div className="m-5 flex items-center justify-between rounded-lg p-3 shadow-lg">
      <div className="flex flex-col">
        <h3>{reservation.name}</h3>
        <p>
          {reservation.startDate.toLocaleDateString("hu-HU")} -{" "}
          {reservation.endDate.toLocaleDateString("hu-HU")}
        </p>
      </div>
      <ReservationStatusTag status={reservation.status} />
      <Link href={`/reservation/${reservation.id}`}>
        <Button>Megtekintés</Button>
      </Link>
    </div>
  );
};

export default ReservationCard;
