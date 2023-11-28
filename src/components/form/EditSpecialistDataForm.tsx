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
import { formatPhone, sleep } from '@/lib/utils';
import { updateById } from '@/lib/firebase';
import { Specialist } from '@/types/users';

interface RadioItem {
  value: string;
  label: string;
}

const GenderProps: RadioItem[] = [
  { value: "Feminino", label: "Feminino" },
  { value: "Masculino", label: "Masculino" },
  { value: "Não sei", label: "Não sei/Prefiro não dizer" },
  { value: "Outro", label: "Outro" },
];

const FormSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório').max(100),
    surname: z.string().min(1, 'Sobrenome é obrigatório').max(100),
    social_name: z.string().max(100).optional().or(z.literal('')),
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
  });

const EditSpecialistDataForm = ({ data }: any) => {
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
      push('/profile')
    })
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
          </div>

          <div className='flex-col gap-x-2'>  
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
                  <FormLabel>Vínculo</FormLabel>
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
                  <FormLabel>Especialidade</FormLabel>
                  <FormControl>
                    <Input placeholder='Computação' {...field} />
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
                              <RadioGroupItem value={specialty.value}/>
                              {/*<RadioGroupItem value={specialty.value} checked={field.value === specialty.value}/>*/}
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
        </div>
        <Button className='w-full mt-6' type='submit'>
          Editar
        </Button>
      </form>
    </Form>
  );
};

export default EditSpecialistDataForm;
