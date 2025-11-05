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
import { Trans, useTranslation } from 'react-i18next';
import "@/config/i18";


const FormSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email invalido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha precisa possuir mais de 8 caracteres'),
});

const SignInForm = () => {
  const { t } = useTranslation('signin');
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
        <div className='space-y-2 w-full'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('emailLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
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
                <FormLabel>{t('passwordLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder={t('passwordPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          {t('loginLabel')}
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
       {t('loginAlternativesSeparator')}
      </div>
      <p className='text-center text-sm  mt-2'>
        <Trans ns='signin' i18nKey="loginAlternativesSignUp">Se não possuir uma conta, por favor <Link className='text-blue-500 hover:underline' href='/sign-up'>Registre-se</Link></Trans>
      </p>
      <p className='text-center text-sm  mt-2'>
        <Trans ns="signin" i18nKey="loginAlternativesForgotPassword">
        Se esqueceu ou deseja trocar sua senha&nbsp;
        <Link className='text-blue-500 hover:underline' href='/forgot-password'>
          Acesse
        </Link>
        </Trans>
      </p>
    </Form>
  );
};

export default SignInForm;
