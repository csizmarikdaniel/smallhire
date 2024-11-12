import ReservationCustomer from "@/app/_components/admin/reservation/reservation-customer";
import ReservationDates from "@/app/_components/admin/reservation/reservation-dates";
import ReservationStatus from "@/app/_components/admin/reservation/reservation-status";
import ReservationWorker from "@/app/_components/admin/reservation/reservation-worker";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const AdminReservationPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  try {
    await api.admin.get();
  } catch (error) {
    redirect("/login");
  }

  const reservation = await api.admin.reservation.get({ reservationId: id });

  return (
    <div>
      <h1 className="my-5 text-center text-3xl">Foglalás</h1>
      <div className="mx-auto max-w-[1000px]">
        {reservation && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <ReservationCustomer
                customer={{
                  email: reservation.customer.user.email,
                  name: reservation?.customer.user.name,
                }}
                reservationId={id}
              />
              <ReservationWorker
                reservationId={id}
                worker={{
                  email: reservation.worker.user.email,
                  name: reservation.worker.user.name,
                }}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-3">
              <ReservationDates
                reservationId={id}
                workerId={reservation.worker.userId}
                endDate={reservation.endDate}
                startDate={reservation.startDate}
              />
              <ReservationStatus
                status={reservation.status}
                reservationId={id}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservationPage;
