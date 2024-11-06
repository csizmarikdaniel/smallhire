import { api } from "@/trpc/server";
import ReservationCard from "./reservation-card";

const ReservationList = async () => {
  const reservations = await api.reservation.list();
  return (
    <div className="mx-auto mt-5 w-full max-w-[1000px] rounded-lg bg-white p-5 shadow-lg">
      <h2 className="text-center text-3xl">Foglalásaim</h2>
      <div>
        {reservations.length == 0 ? (
          <p>Nincsen még foglalásod</p>
        ) : (
          reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))
        )}
      </div>
    </div>
  );
};

export default ReservationList;
