'use client';
import React, { useState } from 'react';
import Combobox from '@/components/ui/combobox';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useRouter, redirect } from 'next/navigation';
import { createEvaluation } from '@/lib/firebase';
import { useToast } from "@/components/ui/use-toast";
import { Evaluation, forms, RadioItem } from '@/types/forms';
import { Input } from '@/components/ui/input';
import { DateField, DatePicker } from '@/components/ui/date-picker';
import { getLocalTimeZone } from '@internationalized/date';
import { motion } from 'framer-motion';

const MethodProps: RadioItem[] = [
    { value: "Autorrelato", label: "Autorrelato" },
    { value: "Autorrelato + Sensores", label: "Autorrelato + Sensores" },
];

const FormSchema = z.object({
    identification: z.string().min(1, 'A identificação é obrigatória').max(100),
    date: z.date({
        required_error: "Selecione uma data",
        invalid_type_error: "Data inválida",
    }).min(new Date(), { message: "Datas passadas não são permitidas" }),
    method: z.enum([MethodProps[0].value, ...MethodProps.slice(1).map((p) => p.value)], { // Garante que o array não é nulo
        errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
    }),
    instrument: z.string().min(1, 'A seleção é obrigatória'),
});

type Inputs = z.infer<typeof FormSchema>
type FieldName = keyof Inputs

const steps = [
  {
    id: 'Step 1',
    name: 'Informações Gerais',
    fields: ['identification', 'date', 'method', 'instrument']
  },
  {
    id: 'Step 2',
    name: 'Usuários',
    fields: []
  }
]

const SetEvaluationForm = ({
    specialistId
}: {
    specialistId: string,
}) => {

    const form = useForm<Inputs>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            identification: '',
            date: new Date(),
            method: '',
            instrument: '',
        },
    });

    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const delta = currentStep - previousStep;

    const { toast } = useToast();
    const { refresh } = useRouter();
    const onSubmit = async (values: Inputs) => {

        let data = values as Evaluation;
        data.specialist = specialistId;
        createEvaluation(data).then(() => {
            toast({
                title: "Socilitação registrada!",
                description: "A avaliação foi adicionada.",
            });
        })
        form.reset();
        refresh();
    };

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await form.trigger(fields as FieldName[], { shouldFocus: true })
    
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
        <section className='flex flex-col justify-between p-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    {currentStep === 0 && (
                        <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='flex flex-col flex-wrap justify-center gap-6'
                        >
                            <FormField
                                control={form.control}
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
                            control={form.control}
                            name='date'
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data da Avaliação</FormLabel>
                                <FormControl>
                                <DatePicker onChange={(value) => field.onChange(value.toDate(getLocalTimeZone()))}>
                                    <DateField />
                                </DatePicker>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                            <FormField
                                control={form.control}
                                name='instrument'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Método de Avaliação</FormLabel>
                                        <FormControl>
                                            <Combobox
                                                className="min-w-[400px]"
                                                onSelect={(value) => field.onChange(value)}
                                                options={forms}
                                                placeholder="Método de Avaliação"
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
            <div className='mt-8 pt-5'>
                <div className='flex justify-between'>
                    <button
                    type='button'
                    onClick={prev}
                    disabled={currentStep === 0}
                    className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-6 w-6'
                    >
                        <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.75 19.5L8.25 12l7.5-7.5'
                        />
                    </svg>
                    </button>
                    <button
                    type='button'
                    onClick={next}
                    disabled={currentStep === steps.length - 1}
                    className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-6 w-6'
                    >
                        <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8.25 4.5l7.5 7.5-7.5 7.5'
                        />
                    </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SetEvaluationForm;