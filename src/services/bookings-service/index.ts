import { notFoundError } from "@/errors";
import { findBookingByUserId } from "@/repositories/booking-repository";
import hotelService from "../hotels-service";

async function getBooking(userId: number) {
  await hotelService.listHotels(userId);

  const booking = await findBookingByUserId(userId);
  if (!booking) throw notFoundError();

  return booking;
}

const bookingsService = {
  getBooking,
};

export default bookingsService;
