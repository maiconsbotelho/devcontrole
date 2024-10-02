import { Container } from "@/components/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import NewCustomerForm from "../components/Form";



export default async function NewCustomer() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      redirect('/');
    }



  return (
    <Container>
      <main className="mb-2 mt-9 flex flex-col">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/customer" className="rounded bg-gray-900 px-4 py-1 text-white">
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo Cliente</h1>
        </div>
        <NewCustomerForm />
      </main>
    </Container>
  );
}