'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
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
import { formatPhone, sleep } from '@/lib/utils';
import { updateById } from '@/lib/firebase';
import { Specialist } from '@/types/users';

interface RadioItem {
  value: string;
  label: string;
}

const EditSpecialistDataForm = ({ data }: any) => {
  const { t } = useTranslation();

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
      social_name: z.string().max(100).optional().or(z.literal('')),
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
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data.name,
      surname: data.surname,
      social_name: data.social_name,
      specialty: data.specialty,
      connection: data.connection,
      phone: formatPhone(data.phone),
      gender: data.gender,
    },
  });

  const { push } = useRouter();
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    updateById(values, data.uid, "user").then(() => {
      push('/profile');
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
                    <Input placeholder={t('José da Silva')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex-col gap-x-2'>
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
          </div>

          <div className='flex-col gap-x-2'>
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
                            {specialty.label}
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
        </div>
        <Button className='w-full mt-6' type='submit'>
          {t('Editar')}
        </Button>
      </form>
    </Form>
  );
};

export default EditSpecialistDataForm;
