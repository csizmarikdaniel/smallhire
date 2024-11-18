import AdminReservationCard from "@/app/_components/admin/reservation/admin-reservation-card";
import Pagination from "@/app/_components/pagination";
import Search from "@/app/_components/search";
import { api } from "@/trpc/server";

type AdminReservationsPageProps = {
  searchParams?: {
    search?: string;
    page?: string;
    limit?: string;
  };
};

const AdminReservationsPage = async ({
  searchParams,
}: AdminReservationsPageProps) => {
  const search = searchParams?.search;
  const limit = parseInt(searchParams?.limit ?? "10");
  const page = parseInt(searchParams?.page ?? "1");
  const { reservations, fullListLength } = await api.admin.reservation.list({
    search,
    limit,
    page,
  });
  return (
    <div className="mx-auto max-w-[1000px]">
      <h1 className="my-5 text-center text-3xl">Foglalások</h1>
      <Search />
      <div className="mt-10 flex flex-col gap-2">
        {reservations.map((reservation) => (
          <AdminReservationCard
            key={reservation.id}
            reservation={reservation}
          />
        ))}
      </div>
      <Pagination listLength={fullListLength} />
    </div>
  );
};

export default AdminReservationsPage;
