import { prisma } from "@/config";

async function findManyTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketWithTicketTypeByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    }
  });
}

async function insertTicket(enrollmentId: number, ticketTypeId: number) {
  const ticket = await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED",
      updatedAt: new Date()
    }
  });

  return ticket.id;
}

async function findTicketWithTicketTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    }
  });
}

async function getTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    }
  });
}

const ticketRepository = {
  findManyTicketsTypes,
  findTicketWithTicketTypeByEnrollmentId,
  insertTicket,
  findTicketWithTicketTypeById,
  getTicketTypeById
};

export default ticketRepository;
