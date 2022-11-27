import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.abstract(),
    }
  });
}

export async function createHotelRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: 100,
      hotelId,
    }
  });
}