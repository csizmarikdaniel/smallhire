import { api } from "@/trpc/server";
import ReservationCard from "./reservation-card";

const ReservationList = async () => {
  const reservations = await api.reservation.list();
  return (
    <div className="mx-auto w-full max-w-[1000px] rounded-lg shadow-lg">
      <h2 className="text-center text-xl">Foglalásaim</h2>
      <div>
        {reservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};

export default ReservationList;
