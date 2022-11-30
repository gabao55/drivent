import { fullRoomError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import hotelRepository from "@/repositories/hotel-repository";
import hotelService from "../hotels-service";

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBookingByUserId(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await hotelService.listHotels(userId);
  
  const room = await hotelRepository.findRoomById(roomId);
  if (!room) throw notFoundError();

  const roomBookings = await bookingRepository.getBookingsByRoomId(roomId);
  if (roomBookings.length >= room.capacity) throw fullRoomError();

  const bookingExists = await bookingRepository.findBookingByUserId(userId);
  if (bookingExists) throw fullRoomError();

  const booking = await bookingRepository.createBooking(userId, roomId);

  return booking;
}

const bookingsService = {
  getBooking,
  createBooking,
};

export default bookingsService;
