'use client';

import { Input } from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
  email: z.string().email('Digite um email válido').min(1, 'O campo email é obrigatório'),
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

export default function NewCustomerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form className="mt-6 flex flex-col">
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <Input />
    </form>
  );
}
