import { prisma } from "@/config";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest, generateUnauthorizedResponse } from "./authentication-middleware";

export async function validateUserAccessToHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const enrollment = await prisma.enrollment.findFirst({
      where: { userId },
      include: {
        Address: true,
      },
    });
    if (!enrollment) return generateUnauthorizedResponse(res);

    const ticket = await prisma.ticket.findFirst({
      where: {
        enrollmentId: enrollment.id,
      },
      include: {
        TicketType: true,
      }
    });
    if (!ticket || ticket.status !== "PAID" || !ticket.TicketType.includesHotel) return generateUnauthorizedResponse(res);

    return next();
  } catch (err) {
    return generateUnauthorizedResponse(res);
  }
}
