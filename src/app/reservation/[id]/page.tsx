import ReservationStatusTag from "@/app/_components/profile/reservation-status-tag";
import DescriptionBlock from "@/app/_components/reservation/description-block";
import { api } from "@/trpc/server";

const ReservationPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const reservation = await api.reservation.get({ id });
  return (
    <div>
      <h1 className="text-center text-2xl">{reservation.name}</h1>
      <ReservationStatusTag status={reservation.status} />
      <p>{reservation.startDate.toLocaleDateString("hu-HU")}</p>
      <p>{reservation.endDate.toLocaleDateString("hu-HU")}</p>
      <p>{reservation.price}</p>
      <DescriptionBlock
        description={reservation.description}
        reservationId={reservation.id}
      />
      <pre>{JSON.stringify(reservation, null, 2)}</pre>
    </div>
  );
};

export default ReservationPage;
