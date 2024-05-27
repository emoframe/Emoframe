'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '@/components/ui/button';
import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";
import { formatPhone } from '@/lib/utils';
import { createUser } from '@/lib/firebase';
import { Specialist } from '@/types/users';

interface RadioItem {
  value: string;
  label: string;
}

const SignUpForm = () => {
  const { t } = useTranslation();

  const SpecialtyProps: RadioItem[] = [
    { value: "Gerontologia", label: t("Gerontologia") },
    { value: "Psicologia", label: t("Psicologia") },
    { value: "Fisioterapia", label: t("Fisioterapia") },
    { value: "Terapia Ocupacional", label: t("Terapia Ocupacional") },
    { value: "Computação", label: t("Computação") },
    { value: "Outra", label: t("Outra") },
  ];

  const GenderProps: RadioItem[] = [
    { value: "Feminino", label: t("Feminino") },
    { value: "Masculino", label: t("Masculino") },
    { value: "Não sei", label: t("Não sei/Prefiro não dizer") },
    { value: "Outro", label: t("Outro") },
  ];

  const FormSchema = z
    .object({
      name: z.string().min(1, { message: t('Nome é obrigatório') }).max(100),
      surname: z.string().min(1, { message: t('Sobrenome é obrigatório') }).max(100),
      social_name: z.string().max(100),
      specialty: z.string().min(1, { message: t('Especialidade é obrigatória') }).max(100),
      connection: z.string().min(1, { message: t('Vínculo é obrigatório') }).max(100),
      phone: z.string().transform((data) => data.replace(/[^\d]/g, ""))
        .superRefine((val, ctx) => {
          if (val.length == 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.too_small,
              minimum: 1,
              type: "string",
              inclusive: true,
              message: t('Telefone é obrigatório'),
            });
          }

          if (val.length < 8) {
            ctx.addIssue({
              code: z.ZodIssueCode.too_small,
              minimum: 1,
              type: "string",
              inclusive: true,
              message: t('Telefone está incompleto'),
            });
          }

          if (val.length > 11) {
            ctx.addIssue({
              code: z.ZodIssueCode.too_big,
              maximum: 11,
              type: "string",
              inclusive: true,
              message: t('Telefone possui 11 caracteres no máximo'),
            });
          }

          if (!isValidMobilePhone(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t('Não é um telefone válido'),
            });
          }
        }),

      gender: z.enum([GenderProps[0].value, ...GenderProps.slice(1).map((p) => p.value)], {
        errorMap: (issue, ctx) => ({ message: t('Selecione uma opção') })
      }),
      email: z.string().min(1, { message: t('Email é obrigatório') }).email({ message: t('Email inválido') }),
      password: z
        .string()
        .min(1, { message: t('Senha é obrigatória') })
        .min(8, { message: t('Senha precisa possuir mais de 8 caracteres') }),
      confirm_password: z.string().min(1, { message: t('Confirmação de senha é obrigatória') }),
    })
    .refine((data) => data.password === data.confirm_password, {
      path: ['confirm_password'],
      message: t('Senhas não batem'),
    });

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
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex sm:flex-col lg:flex-row flex-wrap justify-center gap-6'>
          <div className='flex-col gap-x-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Nome')}</FormLabel>
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
                  <FormLabel>{t('Sobrenome')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('da Silva')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='social_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Nome Social')}</FormLabel>
                  <FormControl>
                    <Input placeholder='José da Silva' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex-col gap-x-2'>
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
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Telefone')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('(99) 99999-9999')}
                      {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        field.onChange(formatPhone(e.target.value as string));
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
                  <FormLabel>{t('Vínculo')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('Universidade de São Paulo')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex gap-x-4'>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t('Gênero')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {GenderProps.map((specialty, index) => (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                          <FormControl>
                            <RadioGroupItem value={specialty.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t(specialty.label)}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex-col gap-x-2'>
            <FormField
              control={form.control}
              name='specialty'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Especialidade')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('Computação')} {...field} />
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
            <FormField
              control={form.control}
              name='confirm_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Confirme sua senha')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('Confirme sua senha')}
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className='w-full mt-6' type='submit'>
          {t('Registre-se')}
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        {t('ou')}
      </div>
      <p className='text-center text-sm mt-2'>
        {t('Se possuir uma conta, por favor')}&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-in'>
          {t('Entre')}
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
