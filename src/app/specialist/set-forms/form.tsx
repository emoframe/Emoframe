'use client';
import React from 'react';
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

const FormSchema = z.object({
    combobox: z.string().min(1, 'A seleção é obriogatória'),
});

const SetForm = ({
    uid, options
}: {
    uid: string,
    options: Array<{ value: string, label: string }>,
}) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            combobox: '',
        },
    });

    const { toast } = useToast();
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
      modifyArray(uid, "user", "forms", values.combobox, "modify").then(() => {
        toast({
            title: "Pedido registrado!",
            description: "O usuário selecionado agora poderá preencher o formulário escolhido.",
        });
      })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <FormField
                    control={form.control}
                    name='combobox'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Combobox
                                    className="w-[400px]" 
                                    onSelect={(value) => field.onChange(value)} 
                                    options={options} 
                                    placeholder="Selecione um formulário" 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full mt-6' type='submit'>
                    Confirmar
                </Button>
            </form>
        </Form>
    )
}

export default SetForm;