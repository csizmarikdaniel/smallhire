import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getReservations = async (db: PrismaClient) => {
  const session = await getSession();

  if (session?.user.role === "WORKER") {
    // Get reservations for worker
    const reservations = await db.reservation.findMany({
      where: {
        workerId: session.user.id,
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        status: true,
        customer: {
          select: {
            user: {
              select: {
                name: true,
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
      name: reservation.customer.user.name,
    }));
    return _reservations;
  } else {
    // Get reservations for customer
    const reservations = await db.reservation.findMany({
      where: {
        customerId: session?.user.id,
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        status: true,
        worker: {
          select: {
            user: {
              select: {
                name: true,
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
      name: reservation.worker.user.name,
    }));
    return _reservations;
  }
};

export default getReservations;
