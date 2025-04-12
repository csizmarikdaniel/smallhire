import { type SessionType } from "@/types";
import { type GetReservationsInput } from "@/types/reservation";
import { type PrismaClient } from "@prisma/client";

const getReservations = async (
  db: PrismaClient,
  session: SessionType,
  input: GetReservationsInput,
) => {
  if (input.status === undefined) {
    input.status = [
      "RESERVED",
      "CANCELLED",
      "REJECTED",
      "CREATEDOFFER",
      "ACCEPTEDOFFER",
      "COMPLETED",
      "REJECTEDOFFER",
    ];
  }
  if (session?.user.role === "WORKER") {
    // Get reservations for worker
    const reservations = await db.reservation.findMany({
      where: {
        workerId: session.user.id,
        customer: {
          user: {
            name: {
              contains: input.search,
            },
          },
        },
        status: {
          in: input.status,
        },
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        status: true,
        description: true,
        customer: {
          select: {
            user: {
              select: {
                name: true,
                images: {
                  where: {
                    profileImage: true,
                  },
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const _reservations = reservations.map((reservation) => ({
      id: reservation.id,
      endDate: reservation.endDate,
      startDate: reservation.startDate,
      status: reservation.status,
      description: reservation.description,
      name: reservation.customer.user.name,
      image: reservation.customer.user.images[0]?.url,
    }));
    return _reservations;
  } else {
    // Get reservations for customer
    const reservations = await db.reservation.findMany({
      where: {
        customerId: session?.user.id,
        worker: {
          user: {
            name: {
              contains: input.search,
            },
          },
        },
        status: {
          in: input.status,
        },
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        status: true,
        description: true,
        worker: {
          select: {
            user: {
              select: {
                name: true,
                images: {
                  where: {
                    profileImage: true,
                  },
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const _reservations = reservations.map((reservation) => ({
      id: reservation.id,
      endDate: reservation.endDate,
      startDate: reservation.startDate,
      status: reservation.status,
      description: reservation.description,
      name: reservation.worker.user.name,
      image: reservation.worker.user.images[0]?.url,
    }));
    return _reservations;
  }
};

export default getReservations;
