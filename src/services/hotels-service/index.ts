import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";

async function listHotels() {
  const hotels = await hotelsRepository.findMany();

  return hotels;
}

async function listHotelRooms(hotelId: string) {
  const rooms = await hotelsRepository.findManyRooms(hotelId);
  if (!rooms.length) throw notFoundError();

  return rooms;
}

const hotelsService = {
  listHotels,
  listHotelRooms
};
  
export default hotelsService;
