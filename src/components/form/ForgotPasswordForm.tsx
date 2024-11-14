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
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { useRouter, redirect } from 'next/navigation';
import { Trans, useTranslation } from 'react-i18next';
import "@/config/i18";


const FormSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email invalido'),
});

const ForgotPasswordForm = () => {
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
    })
  };

  const { t } = useTranslation('forgotPassword');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
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
        </div>
        <Button className='w-full mt-6' type='submit'>
          {t('sendLabel')}
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
       {t('forgotPasswordAlternativesSeparator')}
      </div>
      <p className='text-center text-sm  mt-2'>
        <Trans ns='forgotPassword' i18nKey='forgotPasswordAlternativesSignUp'>
        Se não possuir uma conta, por favor&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Registre-se
        </Link>
        </Trans>
      </p>
    </Form>
  );
};

export default ForgotPasswordForm;
