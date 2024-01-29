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
import { modifyArray } from '@/lib/firebase';
import { useToast } from "@/components/ui/use-toast";
import { forms, RadioItem } from '@/types/forms';
import { Input } from '@/components/ui/input';
import { DateField, DatePicker } from '@/components/ui/date-picker';
import { getLocalTimeZone } from '@internationalized/date';

const MethodProps: RadioItem[] = [
    { value: "Autorrelato", label: "Autorrelato" },
    { value: "Autorrelato + Sensores", label: "Autorrelato + Sensores" },
];

const FormSchema = z.object({
    identification: z.string().min(1, 'A identificação é obrigatória').max(100),
    date: z.date({
        required_error: "Selecione uma data",
        invalid_type_error: "Data inválida",
    }).min(new Date(), { message: "Não se " }),
    method: z.enum([MethodProps[0].value, ...MethodProps.slice(1).map((p) => p.value)], { // Garante que o array não é nulo
        errorMap: (issue, ctx) => ({ message: 'Selecione uma opção' })
    }),
    instrument: z.string().min(1, 'A seleção é obrigatória'),
});

const SetEvaluationForm = ({
    specialistId
}: {
    specialistId: string,
}) => {

    const form = useForm<z.infer<typeof FormSchema>>({
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
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {

        let title, description;
        if (values.mode == "add") {
            title = "Socilitação registrada!";
            description = "O instrumento foi adicionado.";
        }
        else {
            title = "Solicitação removida!";
            description = "O instrumento foi removido.";
        }
        modifyArray(specialistId, "user", "forms", values.combobox, values.mode).then(() => {
            toast({
                title: title,
                description: description,
            });
        })
        form.reset();
        refresh();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
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
                            <FormControl>
                                <Combobox
                                    className="w-[400px]"
                                    onSelect={(value) => field.onChange(value)}
                                    options={forms}
                                    placeholder="Método de Avaliação"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full mt-6' type='submit' onClick={() => form.setValue('mode', 'add')}>
                    Confirmar
                </Button>
            </form>
        </Form>
    )
}

export default SetEvaluationForm;