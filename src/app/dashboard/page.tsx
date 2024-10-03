import { Container } from '@/components/Container';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { TicketItem } from './components/Ticket';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/');
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
      status: 'ABERTO',
    },
    include: {
      customer: true,
    },
  });

  return (
    <Container>
      <main className="mb-2 mt-9">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            href="/dashboard/new"
            className="rounded bg-blue-500 px-4 py-1 text-white"
          >
            Abrir chamado
          </Link>
        </div>

        {/* Renderiza a tabela apenas se houver tickets */}
        {tickets.length > 0 ? (
          <table className="my-2 min-w-full">
            <thead>
              <tr>
                <th className="pl-1 text-left font-medium">CLIENTE</th>
                <th className="hidden text-left font-medium sm:block">
                  DATA CADASTRO
                </th>
                <th className="text-left font-medium">STATUS</th>
                <th className="text-left font-medium">#</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <TicketItem
                  key={ticket.id}
                  customer={ticket.customer}
                  ticket={ticket}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-12 text-center">
            <h1 className="text-gray-600">Nenhum chamado aberto</h1>
          </div>
        )}
      </main>
    </Container>
  );
}
