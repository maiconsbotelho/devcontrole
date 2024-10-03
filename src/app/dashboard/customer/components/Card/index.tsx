'use client';

import { api } from '@/lib/api';
import { CustomerProps } from '@/utils/customer.type';
import { useRouter } from 'next/navigation';

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  // Função para deletar um cliente
  async function handleDeleteCustomer() {
    try {
      const response = await api.delete(`/api/customer`, {
        params: {
          id: customer.id,
        },
      });
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    // Card com as informações do cliente
    <article className="flex flex-col gap-2 rounded-lg border-2 bg-gray-100 p-2 duration-300 hover:scale-105">
      <h2>
        <span className="font-bold">Nome:</span> {customer.name}
      </h2>
      <p>
        <span className="font-bold">Email:</span> {customer.email}
      </p>
      <p>
        <span className="font-bold">Telefone:</span> {customer.phone}
      </p>

      <button
        onClick={handleDeleteCustomer}
        className="mt-2 self-start rounded bg-red-500 px-4 text-white"
      >
        Deletar
      </button>
    </article>
  );
}
