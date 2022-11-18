import { unauthorizedError } from "@/errors";
import { cardData, Ticket } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/tickets-repository";

async function doesEnrollmentBelongToUser(enrollmentId: number, userId: number) {
  const enrollment = await paymentRepository.findEnrollmentById(enrollmentId);
  if (userId !== enrollment.userId) throw unauthorizedError();

  return;
}

async function getPaymentData(ticketId: number) {
  const payment = paymentRepository.findPaymentByTicket(ticketId);

  return payment;
}

async function processPayment(ticket: Ticket, cardData: cardData) {
  cardData.number = String(cardData.number).slice(-4);
  ticket.price = (await ticketRepository.getTicketTypeById(ticket.ticketTypeId)).price;
  const payment = await paymentRepository.insertPayment(ticket, cardData);
  await paymentRepository.updateTicket(ticket.id);

  const result = {
    ...payment,
    ticketId: ticket.id,
  };

  return result;
}

const paymentService = {
  doesEnrollmentBelongToUser,
  getPaymentData,
  processPayment,
};

export default paymentService;
