import { api } from "@/trpc/server";
import { getImageUrl } from "@/utils/get-image-url";
import ReservationStatusTag from "./reservation-status-tag";
import Image from "next/image";
import Button from "../button";
import DotsIcon from "../icons/dots";
import Search from "../search";
import StatusFilter from "../status-filter";

type ReservationListProps = {
  search?: string;
  status?: string[];
};

const ReservationList = async ({ search, status }: ReservationListProps) => {
  const reservations = await api.reservation.list({ search, status });
  const session = await api.auth.getSession();
  return (
    <div className="mx-auto mt-5 w-full max-w-[1000px] rounded-lg bg-white p-5">
      <h2 className="mb-8 text-center text-4xl">Foglalásaim</h2>
      <div>
        {reservations.length == 0 ? (
          <p>Nincsen még foglalásod</p>
        ) : (
          <>
            <Search />
            <div className="">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>
                      {session?.user.role === "CUSTOMER"
                        ? "Szakember"
                        : "Megrendelő"}
                    </th>
                    <th>Munka leírása</th>
                    <th>
                      <div className="flex items-center justify-between">
                        <p>Státusz</p>
                        <StatusFilter />
                      </div>
                    </th>
                    <th>Foglalás időpontja</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          {reservation.image ? (
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <Image
                                  src={getImageUrl(reservation.image)}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="mask mask-squircle h-12 w-12 bg-gray-300"></div>
                          )}
                          <div>
                            <div className="font-bold">{reservation.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{reservation.description}</td>
                      <td>
                        <ReservationStatusTag status={reservation.status} />
                      </td>
                      <td>
                        {reservation.startDate.toLocaleDateString("hu-HU")}
                        <br />
                        {reservation.endDate.toLocaleDateString("hu-HU")}
                      </td>
                      <td>
                        <Button.Link
                          href={`/reservation/${reservation.id}`}
                          size="sm"
                        >
                          <DotsIcon height={10} width={10} color="#ffffff" />
                        </Button.Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationList;
