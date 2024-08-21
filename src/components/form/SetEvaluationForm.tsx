'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRegistration } from '@/lib/firebase';

import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from "@/components/ui/switch"
import { DateField, DatePicker } from '@/components/ui/date-picker';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Combobox from '@/components/ui/combobox';

import { getLocalTimeZone, parseDate } from '@internationalized/date';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import UserDataTable from '@/app/specialist/evaluations/form/data-table';
import { useRouter } from 'next/navigation';

import { DataTableProps, Evaluation, instruments, RadioItem, Option } from '@/types/forms';
import { User } from '@/types/users';
import { Label } from '../ui/label';

const MethodProps: RadioItem[] = [
    { value: "Autorrelato", label: "Autorrelato" },
];

const FormSchema = z.object({
    identification: z.string().min(1, 'A identificação é obrigatória').max(100),
    date: z.date({
        required_error: "Selecione uma data",
        invalid_type_error: "Data inválida",
    }).min(new Date(new Date().setDate(new Date().getDate() - 1)), { message: "Datas passadas não são permitidas" }), // Data de ontem
    method: z.enum([MethodProps[0].value, ...MethodProps.slice(1).map((p) => p.value)], { // Garante que o array não é nulo
        errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
    }),
    instrument: z.string().min(1, 'A seleção é obrigatória'),
    templateId: z.string().optional(),
    users: z.string().array().min(1, 'Pelo menos um usuário deve ser selecionado')
});

type Inputs = z.infer<typeof FormSchema>
type FieldName = keyof Inputs

const steps = [
  {
    id: 'Etapa 1',
    name: 'Dados Gerais',
    fields: ['identification', 'date', 'method']
  },
  {
    id: 'Etapa 2',
    name: 'Instrumento',
    fields: ['instrument']
  },
  {
    id: 'Etapa 3',
    name: 'Usuários',
    fields: []
  }
]

const SetEvaluationForm = ({ specialistId, dataTable, templates } : {
    specialistId: string,
    dataTable: DataTableProps<User, string>,
    templates: Option[]
}) => {
    
    const [useTemplates, setUseTemplates] = useState(false);

    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const motionDirection = (currentStep - previousStep) >=0 ? '50%' : '-50%';

    const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({});

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            identification: '',
            date: new Date(),
            method: MethodProps[0].value,
            instrument: '',
            templateId: '',
            users: []
        },
    });

    const { control, setValue, handleSubmit, watch, trigger } = form;
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        if (useTemplates) {
            setValue("instrument", "template");
        } else {
            setValue("templateId", "");  // Limpar templateId quando não estiver usando templates
        }
    }, [useTemplates, watch, setValue]);

    const onSubmit = async (values: Inputs) => {

        let data = { ...values, specialist: specialistId } as Evaluation;

        createRegistration(data, "evaluation").then(() => {
            toast({
                title: "Socilitação registrada!",
                description: "A avaliação foi adicionada.",
            });
            form.reset();
            setCurrentStep(0);
        })
        .catch((error) => {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao tentar gerar essa avaliação",
                variant: "destructive",
            });
        });
    };

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await trigger(fields as FieldName[], { shouldFocus: true })
    
        if (!output) return
    
        if (currentStep < steps.length - 1) {
          setPreviousStep(currentStep)
          setCurrentStep(step => step + 1)
        }
    }
    
    const prev = () => {
        if (currentStep > 0) {
          setPreviousStep(currentStep)
          setCurrentStep(step => step - 1)
        }
    }

    return (
        <section className='flex flex-col justify-between p-6 lg:w-[600px]'>
            {/* steps */}
            <nav aria-label='Progress' className='mb-6'>
                <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                {steps.map((step, index) => (
                    <li key={step.name} className='md:flex-1'>
                        <div className={`group flex w-full flex-col border-l-4 ${currentStep >= index ? 'border-primary' : 'border-content'} py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4`}>
                            <span className={`text-sm font-medium transition-colors ${currentStep >= index ? 'text-primary' : 'text-content'}`}>{step.id} - {step.name}</span>
                        </div>
                    </li>
                ))}
                </ol>
            </nav>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    {/* Form */}
                    {currentStep === 0 && (
                        <motion.div
                        initial={{ x: motionDirection, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='flex flex-col flex-wrap justify-center gap-1'
                        >
                            <FormField
                                control={control}
                                name='identification'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Identificação da Avaliação</FormLabel>
                                        <FormControl>
                                            <Input placeholder='' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Data da Avaliação</FormLabel>
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
                                control={control}
                                name="method"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                    <FormLabel>Método de Avaliação</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1" 
                                        >
                                        {MethodProps.map((individual, index) => {
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
                        </motion.div>
                    )}   
                    {currentStep === 1 && (
                        <motion.div
                            initial={{ x: motionDirection, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='flex flex-col flex-wrap justify-center gap-1'
                        >
                            <div className='flex flex-col gap-3 mb-6'>
                                <Label>Usar Templates</Label>
                                <Switch 
                                    checked={useTemplates}
                                    onCheckedChange={setUseTemplates} 
                                />
                            </div>
                            <FormField
                                control={control}
                                name='instrument'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instrumento de Avaliação</FormLabel>
                                        <FormControl>
                                            {useTemplates ? (
                                                <Combobox
                                                    className="min-w-[400px]"
                                                    options={templates}
                                                    onSelect={(value) => setValue("templateId", value)}
                                                    placeholder="Método de Avaliação"
                                                />
                                            ) : (
                                                <Combobox
                                                    className="min-w-[400px]"
                                                    options={instruments}
                                                    onSelect={(value) => setValue("instrument", value)}
                                                    placeholder="Método de Avaliação"
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </motion.div>
                    )}
                    {currentStep === 2 && (
                        <motion.div
                            initial={{ x: motionDirection, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='flex flex-col flex-wrap justify-center gap-1'
                        >
                            <FormField
                                control={control}
                                name='users'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Usuários</FormLabel>
                                        <FormControl>
                                        <UserDataTable 
                                            data={dataTable.data} 
                                            columns={dataTable.columns}
                                            selectedRowIds={selectedRowIds}
                                            onSelectionChange={setSelectedRowIds}
                                            onSelect={(value) => field.onChange(value)}
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <Button className='w-full mt-6' type='submit'>
                                Confirmar
                            </Button>
                        </motion.div>
                    )}
                </form>
            </Form>
            {/* Navigation */}
                <div className='flex justify-between mt-8'>
                    <Button
                        variant='icon'
                        onClick={prev}
                        disabled={currentStep === 0}
                    >
                        <ChevronLeft/> Anterior
                    </Button>
                    <Button
                        variant='icon'
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                    >
                        Próximo <ChevronRight/>
                    </Button>
                </div>
        </section>
    )
}

export default SetEvaluationForm;