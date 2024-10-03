import { CustomerProps } from '@/utils/customer.type';

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  return (
    <article className="flex flex-col gap-2 rounded-lg border-2 bg-gray-100 p-2 duration-300 hover:scale-105">
      <h2>
        <a className="font-bold">Nome:</a> {customer.name}
      </h2>
      <p>
        <a className="font-bold">Email:</a> {customer.email}
      </p>
      <p>
        <a className="font-bold">Telefone:</a> {customer.phone}
      </p>

      <button className="mt-2 self-start rounded bg-red-500 px-4 text-white">
        Deletar
      </button>
    </article>
  );
}
