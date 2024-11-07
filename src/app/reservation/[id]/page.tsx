import ReservationStatusTag from "@/app/_components/profile/reservation-status-tag";
import DescriptionBlock from "@/app/_components/reservation/description-block";
import ImagesBlock from "@/app/_components/reservation/images-block";
import ReservationActions from "@/app/_components/reservation/reservation-actions";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const ReservationPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await api.auth.getSession();
  if (!session) {
    redirect("/login");
  }
  const reservation = await api.reservation.get({ reservationId: id });
  const onupload = async (formData: FormData) => {
    "use server";
    await api.reservation.image.add(formData);
  };
  return (
    <div className="mx-auto my-10 max-w-[1000px] rounded-lg bg-white p-5 shadow-lg">
      <div className="flex flex-col items-center">
        <h1 className="mb-7 text-center text-3xl">{reservation.name}</h1>
        <ReservationStatusTag status={reservation.status} />
        <p className="text-xl">
          {reservation.startDate.toLocaleDateString("hu-HU")} -{" "}
          {reservation.endDate.toLocaleDateString("hu-HU")}
        </p>
        <div className="my-5 w-full rounded-lg p-5 shadow-lg">
          <h2 className="text-lg font-bold">Helyszín</h2>
          <p>Cím: {reservation.address}</p>
          <p>Város: {reservation.city}</p>
          <p>Irányítószám: {reservation.zipCode}</p>
        </div>
        {reservation.price && <p>{reservation.price} Ft</p>}
      </div>
      <div className="rounded-lg p-5 shadow-lg">
        <DescriptionBlock
          description={reservation.description}
          reservationId={reservation.id}
        />
      </div>
      <div className="rounded-lg p-5 shadow-lg">
        <h2 className="text-xl font-bold">Foglaláshoz feltöltött képek</h2>
        <ImagesBlock images={reservation.images} onupload={onupload} />
      </div>
      <ReservationActions
        id={reservation.id}
        status={reservation.status}
        role={session.user.role}
      />
    </div>
  );
};

export default ReservationPage;
