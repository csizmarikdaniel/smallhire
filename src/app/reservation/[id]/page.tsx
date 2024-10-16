import ReservationStatusTag from "@/app/_components/profile/reservation-status-tag";
import AddReservationImage from "@/app/_components/reservation/add-reservation-image";
import DescriptionBlock from "@/app/_components/reservation/description-block";
import RemoveReservationImage from "@/app/_components/reservation/remove-reservation-image";
import ReservationActions from "@/app/_components/reservation/reservation-actions";
import { api } from "@/trpc/server";
import Image from "next/image";
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
  const reservation = await api.reservation.get({ id });
  const onupload = async (formData: FormData) => {
    "use server";
    await api.reservation.image.add(formData);
  };
  return (
    <div className="mx-auto max-w-[1000px] rounded-lg p-5 shadow-lg">
      <div className="flex flex-col items-center">
        <h1 className="mb-7 text-center text-2xl">{reservation.name}</h1>
        <ReservationStatusTag status={reservation.status} />
        <p>
          {reservation.startDate.toLocaleDateString("hu-HU")} -{" "}
          {reservation.endDate.toLocaleDateString("hu-HU")}
        </p>
        <p>{reservation.address}</p>
        <p>{reservation.city}</p>
        <p>{reservation.zipCode}</p>
        <p>{reservation.phone}</p>
        {reservation.price && <p>{reservation.price} Ft</p>}
      </div>
      <DescriptionBlock
        description={reservation.description}
        reservationId={reservation.id}
      />
      <div className="relative mt-5 flex flex-wrap justify-center gap-5">
        {reservation.images?.map((image) => (
          <div className="relative" key={image.id}>
            <Image
              src={`https://utfs.io/f/${image.url}`}
              alt="description"
              width={200}
              height={200}
            />
            <RemoveReservationImage imageId={image.id} />
          </div>
        ))}
        <AddReservationImage onupload={onupload} />
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
