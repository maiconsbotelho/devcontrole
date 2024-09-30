import { Container } from '@/components/Container';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { TicketItem } from './components/Ticket';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/');
  }

  return (
    <Container>
      <main className='mt-9 mb-2'>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link href="/dashboard/new" className="rounded bg-blue-500 px-4 py-1 text-white">
            Abrir chamado
          </Link>
        </div>

        <table className='min-w-full my-2'>
          <thead>
            <tr>
              <th className='font-medium text-left pl-1'>CLIENTE</th>
              <th className='font-medium text-left hidden sm:block'>DATA CADASTRO</th>
              <th className='font-medium text-left'>STATUS</th>
              <th className='font-medium text-left'>#</th>
            </tr>
          </thead>

          <tbody>
            <TicketItem />
          </tbody>

        </table>
      </main>
    </Container>
  );
}
