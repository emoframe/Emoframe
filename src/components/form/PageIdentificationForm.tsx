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
import { formatPhone } from '@/lib/utils';
import { DatePicker, DateField } from '../ui/date-picker';
import { getLocalTimeZone, parseDate, today } from "@internationalized/date"
// import { createPageUser } from '@/lib/firebase';
// import { PageUser } from '@/types/users';
import { RadioItem } from '@/types/forms';
import Combobox from '../ui/combobox';
import { Textarea } from '../ui/textarea';

const RaceProps: RadioItem[] = [
    { value: "Amarelo", label: "Amarelo(a)" },
    { value: "Branco", label: "Branco(a)" },
    { value: "Indígena", label: "Indígena" },
    { value: "Pardo", label: "Pardo(a)" },
    { value: "Preto", label: "Preto(a)" },
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
  { value: "Entre 5 e 10 salários mínimos", label: "Entre 4 e 5 salários mínimos" },
  { value: "Mais de 10 salários mínimos", label: "Entre 4 e 5 salários mínimos" },
  { value: "Prefere não informar", label: "Entre 4 e 5 salários mínimos" },
];

const GenderProps: RadioItem[] = [
    { value: "Feminino", label: "Feminino" },
    { value: "Masculino", label: "Masculino" },
    { value: "Não sei", label: "Não sei/Prefiro não dizer" },
    { value: "Outro", label: "Outro" },
];

const SexProps: RadioItem[] = [
    { value: "Feminino", label: "Feminino" },
    { value: "Masculino", label: "Masculino" },
];

const StateProps = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
];

const StatusProps = [
    {
        value: 'SINGLE',
        label: 'Solteiro(a)',
    },
    {
        value: 'MARRIED',
        label: 'Casado(a)/União Estável',
    },
    {
        value: 'DIVORCED',
        label: 'Separado(a)/Divorciado(a)',
    },
    {
        value: 'WIDOWED',
        label: 'Viúvo(a)',
    },
];

const BooleanProps = [
    {
        value: 'TRUE',
        label: 'Sim',
    },
    {
        value: 'FALSE',
        label: 'Não',
    },
];

const HousematesProps = [
    {
        value: 'ALONE',
        label: 'Sozinho(a)',
    },
    {
        value: 'SPOUSE',
        label: 'Somente com o cônjuge',
    },
    {
        value: 'SPOUSE_CHILDREN',
        label: 'Com o cônjuge e filho(s)',	
    },
    {
        value: 'SPOUSE_CHILDREN_GRANDCHILDREN',
        label: 'Com o cônjuge, filho(s) e neto(s)',
    },
    {
        value: 'SPOUSE_GRANDCHILDREN',
        label: 'Com o cônjuge e neto(s)',
    },
    {
        value: 'CHILDREN',
        label: 'Com filho(s)',
    },
    {
        value: 'CHILDREN_GRANDCHILDREN',
        label: 'Com filho(s) e neto(s)',
    },
    {
        value: 'GRANDCHILDREN',
        label: 'Com neto(s)',
    },
    {
        value: 'OTHERS',
        label: 'Outros',
    },
];

const FormSchema = z
    .object({
        name: z.string().min(1, 'Nome é obrigatório').max(100),
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
        city: z.string().min(1, 'Endereço é obrigatório').max(100),
        state: z.enum([StateProps[0].value, ...StateProps.slice(1).map((p) => p.value)], {
            errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
        }),

        birthday: z.date({
            required_error: "Selecione uma data",
            invalid_type_error: "Data inválida",
        }),
        age: z.coerce.number().int('Idade deve ser um número inteiro').nonnegative('Idade deve ser um número positivo'),

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
        sex: z.enum([SexProps[0].value, ...SexProps.slice(1).map((p) => p.value)], {
            errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
        }),
        
        status: z.enum([StatusProps[0].value, ...StatusProps.slice(1).map((p) => p.value)], {
            errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
        }),
        
        schooling_years: z.coerce.number().int('Anos de estudo deve ser um número inteiro').nonnegative('Anos de estudo deve ser um número positivo'),
        
        retirement: z.enum([BooleanProps[0].value, ...BooleanProps.slice(1).map((p) => p.value)], {
            errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
        }),
        job: z.enum([BooleanProps[0].value, ...BooleanProps.slice(1).map((p) => p.value)], {
            errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
        }),
        religion: z.enum([BooleanProps[0].value, ...BooleanProps.slice(1).map((p) => p.value)], {
            errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
        }),

        selfreport: z.string().min(1, 'Auto Relato em Saúde é obrigatório').max(1000, 'Auto Relato em Saúde deve ter no máximo 1000 caracteres'),
        
        housemates: z.enum([HousematesProps[0].value, ...HousematesProps.slice(1).map((p) => p.value)], {
            errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
        }),
    });

const PageIdentificationForm = ({onSubmit}) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            race: '',
            schooling: '',
            individual_income: '',
            family_income: '',
            address: '',
            city: '',
            state: '',
            birthday: new Date(),
            age: 0,
            phone: '',
            gender: '',
            sex: '',
            status: '',
            schooling_years: 0,
            retirement: '',
            job: '',
            religion: '',
            selfreport: '',
            housemates: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <p className="font-bold text-xl self-center mb-4">Dados de Identificação</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
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
                        name='address'
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Endereço</FormLabel>
                                <FormControl>
                                    <Input placeholder='Rua...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='city'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                    <Input placeholder='São Paulo' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='state'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <Combobox
                                        className="min-w-[400px]"
                                        options={StateProps}
                                        onSelect={(value) => form.setValue("state", value)}
                                        placeholder="Selecionar"
                                    />
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
                                <FormLabel>Data de Nascimento</FormLabel>
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
                        name='age'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Idade</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='60' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Sexo</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        {SexProps.map((sex, index) => {
                                            return (
                                                <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                                    <FormControl>
                                                        <RadioGroupItem value={sex.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {sex.label}
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
                        name="race"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Raça</FormLabel>
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
                        name="status"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Estado Civil</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        {StatusProps.map((status, index) => {
                                            return (
                                                <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                                    <FormControl>
                                                        <RadioGroupItem value={status.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {status.label}
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
                        name='schooling_years'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Anos de Estudo Formal</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='18' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                      control={form.control}
                      name="individual_income"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Renda Mensal Individual</FormLabel>
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
                      name="family_income"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Renda Mensal Familiar</FormLabel>
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
                        name="housemates"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Com quem você mora?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        {HousematesProps.map((mates, index) => {
                                            return (
                                                <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                                    <FormControl>
                                                        <RadioGroupItem value={mates.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {mates.label}
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
                        name="retirement"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>O(a) Sr(a) é aposentado(a) ou pensionista?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        {BooleanProps.map((prop, index) => {
                                            return (
                                                <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                                    <FormControl>
                                                        <RadioGroupItem value={prop.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {prop.label}
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
                        name="job"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Exerce atualmente algum tipo de trabalho remunerado?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        {BooleanProps.map((prop, index) => {
                                            return (
                                                <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                                    <FormControl>
                                                        <RadioGroupItem value={prop.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {prop.label}
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
                        name="religion"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Possui alguma religião?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        {BooleanProps.map((prop, index) => {
                                            return (
                                                <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                                    <FormControl>
                                                        <RadioGroupItem value={prop.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {prop.label}
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
                        name='selfreport'
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Auto Relato em Saúde</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <Button className='w-full mt-6' type='submit'>
                    Cadastrar
                </Button>
            </form>
        </Form>
    );
};

export default PageIdentificationForm;
