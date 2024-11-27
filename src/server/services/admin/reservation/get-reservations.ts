import { type AdminGetReservationsInput } from "@/types/admin";
import { paginate } from "@/utils/paginate";
import { type PrismaClient } from "@prisma/client";

const getReservations = async (
  db: PrismaClient,
  input: AdminGetReservationsInput,
) => {
  const reservations = await db.reservation.findMany({
    where: {
      OR: [
        {
          customer: {
            user: {
              name: {
                contains: input.search,
              },
            },
          },
        },
        {
          worker: {
            user: {
              name: {
                contains: input.search,
              },
            },
          },
        },
      ],
    },
    include: {
      customer: {
        include: {
          user: true,
        },
      },
      worker: {
        include: {
          user: true,
        },
      },
    },
  });
  return {
    reservations: paginate(
      reservations.map((reservation) => ({
        id: reservation.id,
        customer: reservation.customer.user.name,
        worker: reservation.worker.user.name,
        status: reservation.status,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
      })),
      { page: input.page, perPage: input.limit },
    ),
    fullListLength: reservations.length,
  };
};

export default getReservations;
