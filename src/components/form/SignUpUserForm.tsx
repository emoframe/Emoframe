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

interface RadioItem {
  value: string;
  label: string;
}

const RaceProps: RadioItem[] = [
  { value: "Amarelo", label: "Amarelo" },
  { value: "Branco", label: "Branco" },
  { value: "Indígena", label: "Indígena" },
  { value: "Pardo", label: "Pardo" },
  { value: "Preto", label: "Preto" },
];

const SchoolingProps: RadioItem[] = [
  { value: "Analfabeto", label: "Analfabeto(a)" },
  { value: "Fundamental Incompleto", label: "Ensino fundamental (incompleto)" },
  { value: "Fundamental Completo", label: "Ensino fundamental (completo)" },
  { value: "Médio Incompleto", label: "Ensino médio (incompleto)" },
  { value: "Médio Completo", label: "Ensino médio (completo)" },
  { value: "Superior Incompleto", label: "Ensino superior (incompleto)" },
  { value: "Superior Completo", label: "Ensino superior (completo)" },
  { value: "Superior com Pós", label: "Ensino superior (com pós-graduação)" },
];

const IndividualIncomeProps: RadioItem[] = [
  { value: "BPC", label: "BPC" },
  { value: "Até 1 salário mínimo", label: "Até 1 salário mínimo" },
  { value: "Entre 1 e 2 salários mínimos", label: "Entre 1 e 2 salários mínimos" },
  { value: "Entre 2 e 3 salários mínimos", label: "Entre 2 e 3 salários mínimos" },
  { value: "Entre 3 e 4 salários mínimos", label: "Entre 3 e 4 salários mínimos" },
  { value: "Entre 4 e 5 salários mínimos", label: "Entre 4 e 5 salários mínimos" },
  { value: "Entre 5 e 10 salários mínimos", label: "Entre 5 e 10 salários mínimos" },
  { value: "Mais de 10 salários mínimos", label: "Mais de 10 salários mínimos" },
  { value: "Prefere não informar", label: "Prefere não informar" },
];

const FamilyIncomeProps: RadioItem[] = [
  { value: "BPC", label: "BPC" },
  { value: "Até 1 salário mínimo", label: "Até 1 salário mínimo" },
  { value: "Entre 1 e 2 salários mínimos", label: "Entre 1 e 2 salários mínimos" },
  { value: "Entre 2 e 3 salários mínimos", label: "Entre 2 e 3 salários mínimos" },
  { value: "Entre 3 e 4 salários mínimos", label: "Entre 3 e 4 salários mínimos" },
  { value: "Entre 4 e 5 salários mínimos", label: "Entre 4 e 5 salários mínimos" },
  { value: "Entre 5 e 10 salários mínimos", label: "Entre 5 e 10 salários mínimos" },
  { value: "Mais de 10 salários mínimos", label: "Mais de 10 salários mínimos" },
  { value: "Prefere não informar", label: "Prefere não informar" },
  { value: "Não se aplica", label: "Não se aplica" },
];

const GenderProps: RadioItem[] = [
  { value: "Feminino", label: "Feminino" },
  { value: "Masculno", label: "Masculno" },
  { value: "Não sei", label: "Não sei/Prefiro não dizer" },
  { value: "Outro", label: "Outro" },
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
    individual_income: z.enum([IndividualIncomeProps[0].value, ...IndividualIncomeProps.slice(1).map((p) => p.value)], {
      errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
    }),
    family_income: z.enum([FamilyIncomeProps[0].value, ...FamilyIncomeProps.slice(1).map((p) => p.value)], {
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

const SignUpForm = ({specialistId}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      surname: '',
      social_name: '',
      race: '',
      schooling: '',
      individual_income: '',
      family_income: '',
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

  const onSubmit = async(values: z.infer<typeof FormSchema>) => {
    let data = values as User;
    data.type = "user";
    data.specialistId = specialistId;
    await createUser(data, specialistId);
    push("/specialist");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className='flex flex-col flex-wrap justify-center gap-6'>

          <div className='flex lg:flex-row sm:flex-col flex-wrap justify-center gap-6'>

            <div className='flex-col gap-x-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
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
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder='da Silva' {...field} />
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
                    <FormLabel>Nome Social</FormLabel>
                    <FormControl>
                      <Input placeholder='José da Silva' {...field} />
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
                    <FormLabel>Data de aniversário</FormLabel>
                    <FormControl>
                      <DatePicker onChange={(value) => field.onChange(value.toDate(getLocalTimeZone()))}>
                        <DateField />
                      </DatePicker>
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
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input 
                      placeholder='(99) 99999-9999' 
                      {...field} 
                      onChange={(value: any): void => {
                        field.onChange(formatPhone(value))
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
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder='Rua...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
          </div>

          <div className='flex gap-x-4 items-center justify-between'>
            <FormField
              control={form.control}
              name="individual_income"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Renda Individual Mensal</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    > 
                      {IndividualIncomeProps.map((individual, index) => {
                        return (
                          <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                            <FormControl>
                              <RadioGroupItem value={individual.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {individual.label}
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
              name="family_income"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Renda Familiar Mensal</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    > 
                      {FamilyIncomeProps.map((family, index) => {
                        return (
                          <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                            <FormControl>
                              <RadioGroupItem value={family.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {family.label}
                            </FormLabel>
                          </FormItem>
                      )})}
              
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
          </div>
          
          <div className='flex gap-x-4 items-start justify-between'>
            <FormField
              control={form.control}
              name="schooling"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Escolaridade</FormLabel>
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
                              {schooling.label}
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
              name="race"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Raça autodeclarada</FormLabel>
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
                              {race.label}
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
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gênero</FormLabel>
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
                              {specialty.label}
                            </FormLabel>
                          </FormItem>
                      )})}
              
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Insira sua senha'
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
                  <FormLabel>Confirme sua senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Confirme sua senha'
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
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
