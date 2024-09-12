import { getSession } from "@/utils/auth";
import { type PrismaClient } from "@prisma/client";

const getReservation = async (db: PrismaClient, { id }: { id: string }) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  if (session.user.role === "WORKER") {
    const reservation = await db.reservation.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        status: true,
        description: true,
        price: true,
        customer: {
          select: {
            user: true,
          },
        },
      },
    });
    if (!reservation) {
      throw new Error("Reservation not found");
    }
    return {
      id: reservation.id,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      status: reservation.status,
      description: reservation.description,
      price: reservation.price,
      name: reservation.customer.user.name,
    };
  } else {
    const reservation = await db.reservation.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        status: true,
        description: true,
        price: true,
        worker: {
          select: {
            user: true,
          },
        },
      },
    });
    if (!reservation) {
      throw new Error("Reservation not found");
    }
    return {
      id: reservation.id,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      status: reservation.status,
      description: reservation.description,
      price: reservation.price,
      name: reservation.worker.user.name,
    };
  }
};

export default getReservation;
