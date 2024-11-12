import Link from "next/link";
import ReservationStatusTag from "../../profile/reservation-status-tag";

type AdminReservationCardProps = {
  reservation: {
    id: string;
    worker: string;
    customer: string;
    startDate: Date;
    endDate: Date;
    status: string;
  };
};

const AdminReservationCard = ({ reservation }: AdminReservationCardProps) => {
  return (
    <Link href={`/admin/reservations/${reservation.id}`}>
      <div className="grid grid-cols-3 rounded-lg bg-white p-5 transition-all duration-200 hover:bg-sky-100">
        <div>
          <p className="text-lg font-bold">Szakember</p>
          <p>{reservation.worker}</p>
        </div>
        <div className="text-center">
          <p>
            {reservation.startDate.toLocaleDateString("hu-HU")} -{" "}
            {reservation.endDate.toLocaleDateString("hu-HU")}
          </p>
          <ReservationStatusTag status={reservation.status} />
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">Megrendelő</p>
          <p>{reservation.customer}</p>
        </div>
      </div>
    </Link>
  );
};

export default AdminReservationCard;
