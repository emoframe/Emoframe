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
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';



const SignInForm = () => {
  const { t } = useTranslation();

  
  const FormSchema = z.object({
    email: z.string().min(1, t('Email é obrigatório')).email(t('Email invalido')),
    password: z
      .string()
      .min(1, t('Senha é obrigatória'))
      .min(8, t('Senha precisa possuir mais de 8 caracteres')),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    signIn('credentials', { email: values.email, password: values.password});
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
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Senha')}</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder={t('Insira sua senha')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Entrar
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
       ou
      </div>
      <p className='text-center text-sm  mt-2'>
      {t('Se não possuir uma conta, por favor')} 
      <Link className='text-blue-500 hover:underline' href='/sign-up'>{t('Registre-se')}</Link>
      </p>
      <p className='text-center text-sm  mt-2'>
      {t('Se esqueceu ou deseja trocar sua senha')}
        <Link className='text-blue-500 hover:underline' href='/forgot-password'>
        {t('Acesse')}
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
