import { prisma } from "@/config";
import { cardData, Ticket } from "@/protocols";

async function findEnrollmentById(enrollmentId: number) {
  return prisma.enrollment.findUnique({
    where: {
      id: enrollmentId,
    }
  });
}

async function findPaymentByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    }
  });
}

async function insertPayment(ticket: Ticket, cardData: cardData) {
  const payment = await prisma.payment.create({
    data: {
      value: ticket.price,
      ticketId: ticket.id,
      cardIssuer: cardData.issuer,
      cardLastDigits: String(cardData.number),
    }
  });

  return payment;
}

async function updateTicket(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    }
  });
}

const paymentRepository = {
  findEnrollmentById,
  findPaymentByTicket,
  insertPayment,
  updateTicket,
};

export default paymentRepository;
