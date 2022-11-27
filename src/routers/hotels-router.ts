import { listHotels, listRooms } from "@/controllers/hotels-controller";
import { authenticateToken, validateUserAccessToHotels } from "@/middlewares";
import { Router } from "express";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken, validateUserAccessToHotels)
  .get("/", listHotels)
  .get("/:hotelId", listRooms);

export { hotelsRouter };
