

export function CardCustomer() {
  return (
    <article className="flex flex-col gap-2 rounded-lg border-2 bg-gray-100 p-2 duration-300 hover:scale-105">
      <h2>
        <a className="font-bold">Nome:</a> Mercado Silva
      </h2>
      <p>
        <a className="font-bold">Email:</a> teste@test.com
      </p>
      <p>
        <a className="font-bold">Telefone:</a> xx999418548
      </p>

      <button className="bg-red-500 px-4 rounded text-white self-start mt-2">
        Deletar

      </button>
    </article>
  );
}