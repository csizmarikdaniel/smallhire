import { type WorkerIdInput } from "@/types";
import { type PrismaClient } from "@prisma/client";

const getWorker = async (db: PrismaClient, input: WorkerIdInput) => {
  const worker = await db.user.findFirst({
    where: {
      id: input.workerId,
      role: "WORKER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      zipCode: true,
      images: true,
    },
  });
  if (!worker) {
    throw new Error(`Worker with id ${input.workerId} not found`);
  }
  return {
    id: worker.id,
    name: worker.name,
    email: worker.email,
    phone: worker.phone,
    address: worker.address,
    city: worker.city,
    zipCode: worker.zipCode,
    image: worker.images.find((image) => image.profileImage)?.url,
  };
};

export default getWorker;
