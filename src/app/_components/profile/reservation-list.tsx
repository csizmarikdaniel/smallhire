import { api } from "@/trpc/server";
import { getImageUrl } from "@/utils/get-image-url";
import ReservationStatusTag from "./reservation-status-tag";
import Link from "next/link";
import Image from "next/image";

const ReservationList = async () => {
  const reservations = await api.reservation.list();
  const session = await api.auth.getSession();
  return (
    <div className="mx-auto mt-5 w-full max-w-[1000px] rounded-lg bg-white p-5">
      <h2 className="mb-8 text-center text-4xl">Foglalásaim</h2>
      <div>
        {reservations.length == 0 ? (
          <p>Nincsen még foglalásod</p>
        ) : (
          <div className="overflow-x-auto">
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
                  <th>Státusz</th>
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
                    <th>
                      <Link
                        href={`/reservation/${reservation.id}`}
                        className="btn btn-xs bg-sky-700 text-white"
                      >
                        details
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationList;
