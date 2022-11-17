import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketsTypes = await ticketRepository.findManyTicketsTypes();

  return ticketsTypes;
}

async function getTicket(enrollmentId: number): Promise<Ticket> {
  const ticket = await ticketRepository.findTicketWithTicketType(enrollmentId);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function createTicket(enrollmentId: number, ticketTypeId: number): Promise<Ticket> {
  const ticket = await ticketRepository.insertTicket(enrollmentId, ticketTypeId);

  return ticket;
}

const ticketsService = {
  getTicketsTypes,
  getTicket,
  createTicket
};

export default ticketsService;
