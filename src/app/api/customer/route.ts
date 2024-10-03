import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// Rota para criar um novo cliente
export async function POST(req: Request) {
  // Verifica se o usuário está autenticado
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authorizes' }, { status: 401 });
  }

  // Recebe os dados do cliente
  const { name, email, phone, address, userId } = await req.json();

  // Verifica se todos os campos foram preenchidos
  try {
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : '',
        userId: userId,
      },
    });

    // Retorna uma mensagem de sucesso
    return NextResponse.json({ message: 'Cliente cadastrado com sucesso!' });

    // Caso ocorra algum erro, retorna uma mensagem de erro
  } catch (err) {
    return NextResponse.json(
      { error: 'Faild create new customer' },
      { status: 400 }
    );
  }
}

// RROTA PARA DELETAR UM CLIENTE
export async function DELETE(req: Request) {
  // Verifica se o usuário está autenticado
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authorizes' }, { status: 401 });
  }

  // Recebe o id do cliente
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  // Verifica se o id foi recebido
  if (!userId) {
    return NextResponse.json({ error: 'Id not provided' }, { status: 400 });
  }

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId as string,
    },
  });

  // Verifica se o cliente possui um ticket
  if (findTicket) {
    return NextResponse.json(
      { error: 'Cliente possui um ticket' },
      { status: 400 }
    );
  }

  try {
    // Deleta o cliente
    await prismaClient.customer.delete({
      where: {
        id: userId as string,
      },
    });
    // Retorna uma mensagem de sucesso
    return NextResponse.json({ message: 'Cliente deletado com sucesso!' });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Failed delete customer' },
      { status: 400 }
    );
  }
}
