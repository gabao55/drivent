import { createBooking, getBookingDetails } from "@/controllers/bookings-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBookingDetails)
  .post("/", createBooking)
  .put("/:bookingId");

export { bookingsRouter };
