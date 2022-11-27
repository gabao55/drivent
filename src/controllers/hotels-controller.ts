import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelsService.listHotels();

    return res.status(httpStatus.OK).send(hotels);    
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function listRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params as Record<string, string>;
  
  try {
    const rooms = await hotelsService.listHotelRooms(hotelId);

    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
