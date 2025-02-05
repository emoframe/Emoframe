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
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button';
import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";
import Link from 'next/link';
import { formatPhone } from '@/lib/utils';
import { DatePicker, DateField } from '../ui/date-picker';
import { getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/firebase';
import { User } from '@/types/users';
import { RadioItem } from '@/types/forms';
import { useTranslation } from 'react-i18next';

const RaceProps: RadioItem[] = [
  { value: "Amarelo", label: "raceOptionAsian" },
  { value: "Branco", label: "raceOptionCaucasian" },
  { value: "Indígena", label: "raceOptionNative" },
  { value: "Pardo", label: "raceOptionMixed" },
  { value: "Preto", label: "raceOptionBlack" },
];

const SchoolingProps: RadioItem[] = [
  { value: "Analfabeto", label: "educationOptionIlliterate" },
  { value: "Fundamental Incompleto", label: "educationOptionPreElementary" },
  { value: "Fundamental Completo", label: "educationOptionElementary" },
  { value: "Médio Incompleto", label: "educationOptionPreHighschool" },
  { value: "Médio Completo", label: "educationOptionHighschool" },
  { value: "Superior Incompleto", label: "educationOptionPreHigher" },
  { value: "Superior Completo", label: "educationOptionHigher" },
  { value: "Superior com Pós", label: "educationOptionPostGrad" },
];

const GenderProps: RadioItem[] = [
  { value: "Feminino", label: "genderOptionF" },
  { value: "Masculino", label: "genderOptionM" },
  { value: "Não sei", label: "genderOptionUnspecified" },
  { value: "Outro", label: "genderOptionOther" },
];

const FormSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório').max(100),
    surname: z.string().min(1, 'Sobrenome é obrigatório').max(100),
    social_name: z.string().max(100),
    race: z.enum([RaceProps[0].value, ...RaceProps.slice(1).map((p) => p.value)], {
      errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
    }),
    schooling: z.enum([SchoolingProps[0].value, ...SchoolingProps.slice(1).map((p) => p.value)], {
      errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
    }),

    address: z.string().min(1, 'Endereço é obrigatório').max(100),

    birthday: z.date({
      required_error: "Selecione uma data",
      invalid_type_error: "Data inválida",
    }),

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

    gender: z.enum([GenderProps[0].value, ...GenderProps.slice(1).map((p) => p.value)], {
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

const SignUpForm = ({ specialistId } : { specialistId: string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      surname: '',
      social_name: '',
      race: '',
      schooling: '',
      address: '',
      birthday: new Date(),
      phone: '',
      gender: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const { push } = useRouter();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    let data = values as User;
    data.type = "user";
    data.specialistId = specialistId;
    await createUser(data, specialistId);
    push("/specialist");
  };

  const { t } = useTranslation('specialist_users_register');

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
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('addressLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('addressPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='birthday'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('birthdateLabel')}</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(value) => field.onChange(value.toDate(getLocalTimeZone()))}
                    value={parseDate(field.value.toISOString().split('T')[0])}
                  >
                    <DateField />
                  </DatePicker>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="race"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t('raceLabel')}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {RaceProps.map((race, index) => {
                      return (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                          <FormControl>
                            <RadioGroupItem value={race.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t(race.label)}
                          </FormLabel>
                        </FormItem>
                      )
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
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
                      )
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schooling"
            render={({ field }) => (
              <FormItem className="col-span-2 space-y-3">
                <FormLabel>{t('educationLabel')}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {SchoolingProps.map((schooling, index) => {
                      return (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                          <FormControl>
                            <RadioGroupItem value={schooling.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t(schooling.label)}
                          </FormLabel>
                        </FormItem>
                      )
                    })}
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
                    type='password'
                    placeholder={t('confirmPasswordPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        <Button className='w-full mt-6' type='submit'>
          {t('registerLabel')}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
