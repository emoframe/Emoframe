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
import { Forms } from '@/types/forms';

const FormSchema = z.object({
    combobox: z.string().min(1, 'A seleção é obrigatória'),
    mode: z.union([z.literal('add'), z.literal('remove')]),
});

const SetInstrumentsUsersForm = ({
    uid, options
}: {
    uid: string,
    options: Array<Forms>,
}) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            combobox: '',
            mode: undefined,
        },
    });

    const { toast } = useToast();
    const { refresh } = useRouter();
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {

        let title, description;
        if (values.mode == "add") {
            title = "Pedido registrado!";
            description = "O usuário selecionado agora poderá preencher o formulário escolhido.";
        }
        else {
            title = "Pedido removido!";
            description = "O usuário selecionado agora não poderá preencher esse formulário.";
        }
        modifyArray(uid, "user", "forms", values.combobox, values.mode).then(() => {
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
                <Button className='w-full mt-6' type='submit' onClick={() => form.setValue('mode', 'add')}>
                    Confirmar
                </Button>
                <Button className='w-full mt-6' type='submit' onClick={() => form.setValue('mode', 'remove')}>
                    Remover
                </Button>
            </form>
        </Form>
    )
}

export default SetInstrumentsUsersForm;