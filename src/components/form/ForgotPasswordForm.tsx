'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const ForgotPasswordForm = () => {
  const { t } = useTranslation();

  const FormSchema = z.object({
    email: z.string().min(1, { message: t('Email é obrigatório') }).email({ message: t('Email inválido') }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const router = useRouter();
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    sendPasswordResetEmail(auth, values.email).then(() => {
      router.push('/');
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Email')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('mail@example.com')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          {t('Enviar')}
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        {t('ou')}
      </div>
      <p className='text-center text-sm mt-2'>
        {t('Se não possuir uma conta, por favor')}&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          {t('Registre-se')}
        </Link>
      </p>
    </Form>
  );
};

export default ForgotPasswordForm;
