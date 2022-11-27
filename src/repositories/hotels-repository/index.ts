import { prisma } from "@/config";

async function findMany() {
  return prisma.hotel.findMany();
}

async function findManyRooms(hotelId: string) {
  return prisma.room.findMany({
    where: { hotelId: Number(hotelId) },
    include: {
      Hotel: true,
    }
  });
}

const hotelsRepository = {
  findMany,
  findManyRooms,
};
  
export default hotelsRepository;
