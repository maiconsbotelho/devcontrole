import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authorizes' }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await req.json();

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

    return NextResponse.json({ message: 'Cliente cadastrado com sucesso!' });
  } catch (err) {
    return NextResponse.json(
      { error: 'Faild create new customer' },
      { status: 400 }
    );
  }
}
