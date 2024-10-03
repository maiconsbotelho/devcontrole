import { Container } from '@/components/Container';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CardCustomer } from './components/Card';
import prismaClient from '@/lib/prisma';

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/');
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  })


  return (
    <Container>
      <main className="mb-2 mt-9">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus Clientes</h1>
          <Link href="/dashboard/customer/new" className="rounded bg-blue-500 px-4 py-1 text-white">
            Novo Cliente
          </Link>
        </div>

        <section className="mt-2 grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer => (
            <CardCustomer
              key={customer.id}
            customer={customer}/>
          )))}
        </section>
      </main>
    </Container>
  );
}
