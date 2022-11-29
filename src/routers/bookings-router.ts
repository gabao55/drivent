import { getBookingDetails } from "@/controllers/bookings-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBookingDetails)
  .post("/")
  .put("/:bookingId");

export { bookingsRouter };
