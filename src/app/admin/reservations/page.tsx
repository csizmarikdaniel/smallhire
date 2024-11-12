import AdminReservationCard from "@/app/_components/admin/reservation/admin-reservation-card";
import Search from "@/app/_components/search";
import { api } from "@/trpc/server";

const AdminReservationsPage = async () => {
  const reservations = await api.admin.reservation.list();
  return (
    <div>
      <h1 className="my-5 text-center text-3xl">Foglalások</h1>
      <Search />
      <div className="flex flex-col gap-2">
        {reservations.map((reservation) => (
          <AdminReservationCard
            key={reservation.id}
            reservation={reservation}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminReservationsPage;
