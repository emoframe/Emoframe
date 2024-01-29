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
import { getLocalTimeZone, parseDate } from '@internationalized/date';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DateValue } from 'react-aria';

const MethodProps: RadioItem[] = [
    { value: "Autorrelato", label: "Autorrelato" },
    { value: "Autorrelato + Sensores", label: "Autorrelato + Sensores" },
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

        console.log(output)
    
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
                    {/* Form */}
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
                                                defaultValue={field.value}
                                                options={forms}
                                                placeholder="Método de Avaliação"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </motion.div>
                    )}   
                    {currentStep === 1 && (
                        <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='flex flex-col flex-wrap justify-center gap-6'
                        >
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
                        <ChevronLeft/>
                    </Button>
                    <Button
                        variant='icon'
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                    >
                        <ChevronRight/>
                    </Button>
                </div>
        </section>
    )
}

export default SetEvaluationForm;