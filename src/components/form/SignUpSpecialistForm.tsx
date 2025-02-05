'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button';
import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";
import Link from 'next/link';
import { formatPhone } from '@/lib/utils';
import { createUser } from '@/lib/firebase';
import { Specialist } from '@/types/users';
import { RadioItem } from '@/types/forms';
import { Trans, useTranslation } from 'react-i18next';
import "@/config/i18";

const SpecialtyProps: RadioItem[] = [
  { value: "Gerontologia", label: "Gerontologia" },
  { value: "Psicologia", label: "Psicologia" },
  { value: "Fisioterapia", label: "Fisioterapia" },
  { value: "Terapia Ocupacional", label: "Terapia Ocupacional" },
  { value: "Computação", label: "Computação" },
  { value: "Outra", label: "Outra" },
];

const GenderProps: RadioItem[] = [
  { value: "Feminino", label: "genderOptionFLabel" },
  { value: "Masculino", label: "genderOptionMLabel" },
  { value: "Não sei", label: "genderOptionUnknownLabel" },
  { value: "Outro", label: "genderOptionOtherLabel" },
];

const FormSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório').max(100),
    surname: z.string().min(1, 'Sobrenome é obrigatório').max(100),
    social_name: z.string().max(100),
    specialty:  z.string().min(1, 'Especialidade é obrigatória').max(100),
    connection: z.string().min(1, 'Vínculo é obrigatório').max(100),
    phone: z.string().transform((data) => data.replace(/[^\d]/g, ""))
    .superRefine((val, ctx) => {
      if (val.length == 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "string",
          inclusive: true,
          message: "Telefone é obrigatório",
        });
      }

      if (val.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "string",
          inclusive: true,
          message: "Telefone está incompleto",
        });
      }
    
      if (val.length > 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 11,
          type: "string",
          inclusive: true,
          message: "Telefone possui 11 caracteres no máximo",
        });
      }  

      if (!isValidMobilePhone(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Não é um telefone válido",
        });
      }
    }),

    gender: z.enum([GenderProps[0].value, ...GenderProps.slice(1).map((p) => p.value)],  {
      errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
    }),
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(8, 'Senha precisa possuir mais de 8 caracteres'),
    confirm_password: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Senhas não batem',
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      surname: '',
      social_name: '',
      specialty: '',
      connection: '',
      phone: '',
      gender: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    let data = values as Specialist;
    data.type = "specialist";
    createUser(data).then(() => {
      router.push("/");
    })
  };

  const { t } = useTranslation('signup');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <p className="font-bold text-xl self-center mb-4">{t('title')}</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('nameLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='José' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='surname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('surnameLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='da Silva' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phoneLabel')}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder='(99) 99999-9999' 
                    {...field} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                      field.onChange(formatPhone(e.target.value as string))
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='connection'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('associationLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='Universidade de São Paulo' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='specialty'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('specialtyLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('specialtyPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="col-span-2 space-y-3">
                <FormLabel>{t('genderLabel')}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  > 
                    {GenderProps.map((specialty, index) => {
                      return (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                          <FormControl>
                            <RadioGroupItem value={specialty.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t(specialty.label)}
                          </FormLabel>
                        </FormItem>
                    )})}
                  </RadioGroup>
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
          <FormField
            control={form.control}
            name='confirm_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('confirmPasswordLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('confirmPasswordPlaceholder')}
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          {t('signUpLabel')}
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        {t('signUpAlternativesSeparator')}
      </div>
      <p className='text-center text-sm  mt-2'>
        <Trans ns='signup' i18nKey='signUpAlternativesSignIn'>
        Se possuir uma conta, por favor&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-in'>
          Entre
        </Link>
        </Trans>
      </p>
    </Form>
  );
};

export default SignUpForm;
