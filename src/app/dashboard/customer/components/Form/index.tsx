'use client';

import { Input } from '@/components/Input';
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
  email: z
    .string()
    .email('Digite um email válido')
    .min(1, 'O campo email é obrigatório'),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message: 'O número de telefone dever estar (DD) 999999999',
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function handleRegisterCustumer(data: FormData) {
    await api.post('/api/customer', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      userId: userId,
    });

    router.replace('/dashboard/customer');
    router.refresh();
  }

  return (
    <form
      className="mt-6 flex flex-col"
      onSubmit={handleSubmit(handleRegisterCustumer)}
    >
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo..."
        register={register}
        error={errors.name?.message}
      />

      <section className="my-2 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="text"
            name="phone"
            placeholder="Exemplo (DD) 999999999"
            register={register}
            error={errors.phone?.message}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o email..."
            register={register}
            error={errors.email?.message}
          />
        </div>
      </section>

      <label className="mb-1 mt-2 text-lg font-medium">Endereço</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço do cliente..."
        register={register}
        error={errors.address?.message}
      />

      <button
        type="submit"
        className="my-4 h-11 rounded bg-blue-500 px-2 font-bold text-white"
      >
        Cadastrar
      </button>
    </form>
  );
}
