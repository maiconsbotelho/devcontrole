import { Container } from '@/components/Container';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function NewTicket() {
  // Verifica se o usuário está autenticado
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/');
  }

  // Busca os clientes do usuário autenticado
  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  // Função para criar um novo chamado
  async function handleRegisterTicket(formData: FormData) {
    'use server';

    // Verifica se os campos obrigatórios foram preenchidos
    const name = formData.get('name');
    const description = formData.get('description');
    const customerId = formData.get('customer');

    if (!name || !description || !customerId) {
      return;
    }

    // Cria um novo chamado
    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: 'ABERTO',
        userId: session?.user.id,
      },
    });

    redirect('/dashboard');
  }

  return (
    <Container>
      <main className="mb-2 mt-9">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded bg-gray-900 px-4 py-1 text-white"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>

        {/* Formulário para criar um novo chamado */}
        <form action={handleRegisterTicket} className="mt-6 flex flex-col">
          <label className="mb-1 text-lg font-medium">Nome do chamado</label>
          <input
            className="mb-2 h-11 w-full rounded-md border-2 px-2"
            type="text"
            placeholder="Digite o nome do chamado"
            required
            name="name"
          />
          <label className="mb-1 text-lg font-medium">
            Descreva o problema
          </label>
          <textarea
            className="mb-2 h-24 w-full resize-none rounded-md border-2 px-2"
            placeholder="Descreva o problema..."
            required
            name="description"
          ></textarea>

          {/* // Exibe a lista de clientes do usuário autenticado */}

          {customers.length !== 0 && (
            <>
              <label className="mb-1 text-lg font-medium">
                Descreva o problema
              </label>
              <select
                className="mb-2 h-11 w-full rounded-md border-2 bg-white px-2"
                name="customer"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* // Exibe um aviso caso o usuário não tenha clientes cadastrados */}
          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Você ainda não possui nenhum cliente,{' '}
              <span className="font-medium text-blue-500">
                Cadastrar cliente
              </span>
            </Link>
          )}

          <button
            className="my-4 h-11 rounded-md bg-blue-500 px-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            type="submit"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
