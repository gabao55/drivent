import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentData(req: AuthenticatedRequest, res: Response) {
  if (req.query.ticketId === undefined) return res.sendStatus(httpStatus.BAD_REQUEST);
  const ticketId = Number(req.query.ticketId) as number;
  const { userId } = req;

  try {
    const enrollmentId = (await ticketsService.getTicketById(ticketId)).enrollmentId;
    await paymentService.doesEnrollmentBelongToUser(enrollmentId, userId);
    const payment = await paymentService.getPaymentData(ticketId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    else return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function processPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body;
  const { userId } = req;

  try {
    const enrollmentId = (await ticketsService.getTicketById(ticketId)).enrollmentId;
    await paymentService.doesEnrollmentBelongToUser(enrollmentId, userId);
    const ticket = await ticketsService.getTicketByEnrollment(enrollmentId);

    const payment = await paymentService.processPayment(ticket, cardData);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    else return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
