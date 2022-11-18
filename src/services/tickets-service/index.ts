import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketsTypes = await ticketRepository.findManyTicketsTypes();

  return ticketsTypes;
}

async function getTicketByEnrollment(enrollmentId: number): Promise<Ticket> {
  const ticket = await ticketRepository.findTicketWithTicketTypeByEnrollmentId(enrollmentId);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function createTicket(enrollmentId: number, ticketTypeId: number): Promise<Ticket> {
  const ticketId = await ticketRepository.insertTicket(enrollmentId, ticketTypeId);
  const ticket = await getTicketById(ticketId);

  return ticket;
}

async function getTicketById(ticketId: number) {
  const ticket = await ticketRepository.findTicketWithTicketTypeById(ticketId);
  if (!ticket) throw notFoundError();

  return ticket;
}

const ticketsService = {
  getTicketsTypes,
  getTicketByEnrollment,
  createTicket,
  getTicketById
};

export default ticketsService;
