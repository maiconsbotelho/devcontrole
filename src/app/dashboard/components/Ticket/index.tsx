'use client';

import { api } from '@/lib/api';
import { CustomerProps } from '@/utils/customer.type';
import { TicketProps } from '@/utils/ticket.type';
import { useRouter } from 'next/navigation';
import { FiCheckSquare, FiFile } from 'react-icons/fi';

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  const router = useRouter();

  async function handleChangeStatus() {
    try {
      await api.patch(`/api/ticket`, {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <tr className="h-16 border-b-2 border-b-slate-200 bg-slate-100 duration-300 last:border-b-0 hover:bg-gray-200">
        <td className="pl-1 text-left"> {customer?.name} </td>
        <td className="hidden text-left sm:table-cell">
          {ticket.created_at?.toLocaleDateString('pt-br')}
        </td>
        <td className="text-left">
          <span className="rounded bg-green-500 px-2 py-1">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button onClick={handleChangeStatus} className="mr-3">
            <FiCheckSquare size={24} color="#131313" />
          </button>

          <button>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
