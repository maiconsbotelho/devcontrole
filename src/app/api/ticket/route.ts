import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authorizes' }, { status: 401 });
  }

  const { id } = await req.json();
  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 400 });
  }

  try {
    await prismaClient.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: 'FECHADO',
      },
    });

    return NextResponse.json({ message: 'Ticket updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error on update ticket' },
      { status: 400 }
    );
  }
}
