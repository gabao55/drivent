import { prisma } from "@/config";

async function findManyTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketWithTicketType(enrollmentId: number) {
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
  const ticketId = (await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED",
      updatedAt: new Date()
    }
  })).id;

  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    }
  });
}

const ticketRepository = {
  findManyTicketsTypes,
  findTicketWithTicketType,
  insertTicket
};

export default ticketRepository;
