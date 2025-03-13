'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const DefaultProps = {
    Affirmative: [{ value: '1', label: '1 = SIM' }, { value: '0', label: '0 = NÃO' }],
    Negative: [{ value: '0', label: '0 = SIM' }, { value: '1', label: '1 = NÃO' }],
};

const BooleanProps = [{value: '1', label: 'SIM'}, {value: '0', label: 'NÃO'}];

const BiologicalFormSchema = z.object({
    sensorial: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(4),
    sensorial_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
    functional: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(6),
    functional_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
    malnutrition: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(6),
    malnutrition_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
    cardiovasculars: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(8),
    cardiovasculars_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
    medicine_44: z.object({
        checks: z.enum(
            [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
            { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
        ).array().length(11),
        others: z.string(),
    }),
    medicine_45: z.object({
        checks: z.enum(
            [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
            { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
        ).array().length(7),
        others: z.string(),
    }),
    medicine: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(9),
    medicine_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
});

const PageBiologicalForm = ({onSubmit}) => {
    const form = useForm<z.infer<typeof BiologicalFormSchema>>({
        resolver: zodResolver(BiologicalFormSchema),
        defaultValues: {
            sensorial: ['', '', '', ''],
            sensorial_result: '',
            functional: ['', '', '', '', '', ''],
            functional_result: '',
            malnutrition: ['', '', '', '', '', ''],
            malnutrition_result: '',
            cardiovasculars: ['', '', '', '', '', '', '', ''],
            cardiovasculars_result: '',
            medicine_44: {
                checks: ['', '', '', '', '', '', '', '', '', '', ''],
                others: '',
            },
            medicine_45: {
                checks: ['', '', '', '', '', '', ''],
                others: '',
            },
            medicine: ['', '', '', '', '', '', '', '', ''],
            medicine_result: '',
        }
    });

    const [weight, setWeight] = useState(1);
    const [height, setHeight] = useState(1);

    const calcResult = section => form.watch(section).reduce((acc, e) => acc + (e ? Number(e) : 0), 0);

    return (
        <Form {...form}>
            <form className='flex flex-col flex-wrap justify-center gap-8 mt-8' onSubmit={form.handleSubmit(onSubmit)}>
                <h1 className="font-bold text-4xl self-center"> DÉFICIT SENSORIAL </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='sensorial.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">20-O(a) senhor(a) tem dificuldades para enxergar? <b>[Observação: Mesmo se já utilizar óculos ou outros métodos corretivos.]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='sensorial.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">21-O(a) senhor tem dificuldades para ouvir o que as pessoas falam? <b>[Observação: Mesmo se já utilizar aparelho auditivo]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='sensorial.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">22-O(a) senhor(a) tem dificuldade para sentir o sabor dos alimentos?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='sensorial.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">23-Por causa dos seus sentidos (visão, audição, paladar), o senhor(a) tem dificuldade de realizar suas atividades cotidianas?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='sensorial_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 4): {calcResult('sensorial')}</p>
                            <p className="text-xl">Necessita de investigação?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {BooleanProps.map((prop, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={prop.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {prop.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <h1 className="font-bold text-4xl self-center"> INCAPACIDADE FUNCIONAL </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='functional.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">24-O(A) senhor(a) necessita de ajuda para fazer compras fora de casa?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='functional.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">25-O(A) senhor(a) necessita de ajuda para usar meios de transporte coletivo (ônibus, metrô e trem)?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='functional.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">26-O(A) senhor(a) necessita de ajuda para cozinhar a própria comida?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='functional.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">27-O(A) senhor(a) necessita de ajuda para usar o telefone?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='functional.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">28-O(A) senhor(a) necessita de ajuda para vestir-se (exceto para colocar as meias e calçados)?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='functional.5'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">29-O(A) senhor(a) necessita de ajuda para tomar banho?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='functional_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 6): {calcResult('functional')}</p>
                            <p className="text-xl">Necessita de investigação?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {BooleanProps.map((prop, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={prop.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {prop.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <h1 className="font-bold text-4xl self-center"> DESNUTRIÇÃO </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='malnutrition.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">30-O(a) senhor tem dificuldades para mastigar?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='malnutrition.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">31-O(a) senhor(a) faz menos do que três refeições por dia?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='malnutrition.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">32-Nos últimos 3 meses, o(a) senhor(a) percebeu que passou a comer menos sem motivo?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='malnutrition.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">33 -Nos últimos 3 meses, o(a) senhor(a) perdeu peso sem motivo aparente? Se sim, quantos quilos?</p>
                            <Input type='number' className='w-auto' />
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='malnutrition.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">34-Nos últimos 3 meses, o(a) senhor(a) passou por algum estresse psicológico?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='malnutrition.5'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">35 -Índice de Massa Corporal:</p>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-row gap-3'>
                                    <label className="text-xl">Qual o seu peso? (kg)</label>
                                    <Input className='w-auto' type='number' value={weight} onChange={event => setWeight(event.target.value)} />
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <label className="text-xl">Qual a sua estatura? (cm)</label>
                                    <Input className='w-auto' type='number' value={height} onChange={event => setHeight(event.target.value)} />
                                </div>
                                <p className='text-xl font-bold'>IMC = {weight / ((height / 100) ** 2)}</p>
                            </div>
                            <p className="text-xl font-bold">[Instruções: Medir o peso e a altura do(a) idoso(a). Caso não seja possível, seguir com os dados que forem autorreferidos pelo(a) idoso(a)].</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='malnutrition_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 6): {calcResult('malnutrition')}</p>
                            <p className="text-xl">Necessita de investigação?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {BooleanProps.map((prop, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={prop.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {prop.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <h1 className="font-bold text-4xl self-center"> DOENÇAS CARDIOVASCULA-RES (DCV) </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='cardiovasculars.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">36-O(a) senhor(a) tem histórico familiar (pais, irmãos ou filhos) de DCV (infarto, derrame, angina)? <b>[Pontuar como sim quando CT e HDL forem verificados em último exame como superior a 200 mg/dL e 60mg/dL, respectivamente, ou caso o(a) idoso(a) não saiba informar]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='cardiovasculars.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">37-O(a) senhor(a) tem pressão alta (superior a 140 x 90 mmHg)? <b>[Instruções: Pontuar como sim quando PA autorreferida for superior ao valor indicado, mesmo com o uso de anti-hipertensivos, ou caso o(a) idoso(a) não saiba informar. Solicitar exames laboratoriais recentes (últimos 6 meses). Caso não tenha, prosseguir com as perguntas 38 e 39, considerando apenas os auto relatos.]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='cardiovasculars.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">38-O(a) senhor(a) tem glicemia de jejum superior a 100 mg/dL? <b>[Instruções: Pontuar como sim quando a resposta for positiva mesmo com o uso de antidiabéticos ou caso o(a) idoso(a) não saiba informar.]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='cardiovasculars.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">39-O(a) senhor(a) tem colesterol alterado? <b>[Instruções: Pontuar como sim quando 1) verificar no exame valores de CT e HDL superior a 200mg/dL e inferior 60mg/dL, respectivamente, mesmo com uso de hipolipemiantes; 2) autorrelato de colesterol alterado; ou 3) caso o(a) idoso(a) não saiba informar.]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='cardiovasculars.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">40-O(a) senhor(a) fuma ou deixou de fumar nos últimos seis meses?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='cardiovasculars.5'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">41 -O(a) senhor(a) tem o hábito de ingerir bebidas alcoólicas?</p>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-row gap-3'>
                                    <label className="text-xl">Se sim, qual o tipo da bebida?</label>
                                    <Input className='w-auto' />
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <label className="text-xl">E quantas doses, taças ou latas em uma semana?</label>
                                    <Input type='number' className='w-auto' />
                                </div>
                            </div>
                            <p className='text-xl font-bold'>[Instruções: Assinale abaixo a resposta equivalente, considerando as seguintes referências: Homens: Mais do que 14 doses de destilado (350 ml), 7 taças de vinho (2 litros) ou 14 latas de cerveja (5 litros). Mulheres: Mais do que 7 doses de destilado (175 ml), 3 taças e meia de vinho (1 litro) ou 7 latas de cerveja (2,5 litros)].</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='cardiovasculars.6'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">42 -O(a) senhor(a) pratica exercícios físicos regulares (caminhada, natação, dança, ginástica, musculação, entre outros)?</p>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-row gap-3'>
                                    <label className="text-xl">Se sim, qual a frequência?</label>
                                    <Input className='w-auto' />
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <label className="text-xl">E por quanto tempo?</label>
                                    <Input className='w-auto' />
                                </div>
                            </div>
                            <p className='text-xl font-bold'>[Instruções: Depois assinale ao lado a resposta equivalente (sim ou não) considerando prática regular de exercícios como: frequência igual ou superior a 2 dias/semana com tempo total igual ou superior a 150 minutos/semana].</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='cardiovasculars.7'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">43-IMC para obesidade: ≥27 Kg/m2 <b>[Instruções: verificar na questão 35]</b></p>
                            <p className="text-xl"><b>IMC = {weight / ((height / 100) ** 2)}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='cardiovasculars_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 8): {calcResult('cardiovasculars')}</p>
                            <p className="text-xl">Necessita de investigação?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {BooleanProps.map((prop, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={prop.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {prop.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <h1 className="font-bold text-4xl self-center"> USO INADEQUADO DE MEDICAMENTOS </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='medicine_44'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">44 -Nos últimos 5 anos, algum médico ou outro profissional de saúde já disse que o(a) senhor(a) tem?</p>
                            <div className='flex flex-row gap-3 items-center'>
                                <label className="text-xl">Registre a quantidade (em números) total de diagnósticos:</label>
                                <Input type='number' className='w-auto' />
                            </div>
                            <div className='flex flex-col items-start gap-3'>
                                {[
                                    'Doença do coração (angina, infarto ou ataque cardíaco)',
                                    'Pressão alta/ hipertensão',
                                    'Derrame/AVC/Isquemia',
                                    'Diabetes Mellitus',
                                    'Tumor maligno/ Câncer',
                                    'Asma/Bronquite/Enfisema',
                                    'Osteoporose? (Osteopenia?)',
                                    'Reumatismo',
                                    'Tendinite',
                                    'Problemas de circulação',
                                    'Depressão'
                                ].map((prop, index) => (
                                    <div className="flex flex-row items-center gap-3" key={index}>
                                        <FormControl>
                                            <Checkbox onChange={field.onChange} defaultValue={field.value.checks[index]} value={field.value.checks[index]}/>
                                        </FormControl>
                                        <FormLabel className="font-normal text-md">{prop}</FormLabel>
                                    </div>
                                ))}
                                <div className='flex flex-row gap-3 items-center'>
                                    <FormLabel className="text-xl">Outra?</FormLabel>
                                    <FormControl>
                                        <Input onChange={event => form.setValue('medicine_44.others', event.target.value)} />
                                    </FormControl>
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine_45'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">45 -O(a) senhor(a) tem algum dos seguintes problemas de saúde:</p>
                            <div className='flex flex-col items-start gap-3'>
                                {[
                                    'Dor de cabeça',
                                    'Dor nas costas ou em outra parte do corpo',
                                    'Alergia',
                                    'Problema emocional',
                                    'Tontura',
                                    'Dificuldades para dormir',
                                    'Incontinência urinária/perda de urina (por esforço)',
                                ].map((prop, index) => (
                                    <div className="flex flex-row items-center gap-3" key={index}>
                                        <FormControl>
                                            <Checkbox onChange={field.onChange} defaultValue={field.value.checks[index]} value={field.value.checks[index]}/>
                                        </FormControl>
                                        <FormLabel className="font-normal text-md">{prop}</FormLabel>
                                    </div>
                                ))}
                                <div className='flex flex-row gap-3 items-center'>
                                    <FormLabel className="text-xl">Outro?</FormLabel>
                                    <FormControl>
                                        <Input onChange={event => form.setValue('medicine_45.others', event.target.value)} />
                                    </FormControl>
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">46 -Quais os medicamentos utilizados pelo(a) senhor(a)? Registre a quantidade (em números) de medicamentos inapropriados utilizados:</p>
                            <p className='text-xl font-bold'>[Instruções: Solicitar as bulas dos medicamentos e fazer registro legível dos respectivos nomes e classes terapêuticas. Para classificar se há presença de polifarmácia,registrar ao lado se o idoso utiliza cinco medicamentos ou mais.]</p>
                            <Textarea />
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">47-O(A) senhor(a) sabe para que serve todos os seus medicamentos?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">48-Nos últimos 6 meses, houve aumento progressivo na quantidade de medicamentos prescritos para o(a) senhor(a)?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">49-Os medicamentos que o(a) senhor(a) faz uso foram prescritos por médicos diferentes?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">50-O(a) senhor(a) toma os medicamentos de acordo com as orientações médicas?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine.5'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">51-O (a) senhor(a) deixa de tomar seus medicamentos com frequência?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine.6'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">52-O(a) senhor(a) tem o costume de tomar remédios por conta própria?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine.7'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">53-Verificar na lista de medicamentos potencialmente inapropriados para idosos brasileiros (anexada ao PAGe) se o(a) idoso(a) toma algum dos medicamentos citados na mesma. [Caso sim, pontue ao lado e os deixe destacados na lista.]</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine.8'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">54-Cálculo do risco para reações adversas. <b>[Instruções: Para utilizar esta tabela e saber se o idoso se enquadra em um grupo de risco para reações adversas, verifique na questão 44 o número de diagnósticos e na questão 53 se o idoso faz uso de medicamento inapropriado. Circule estas informações nas respectivas coluna e linha em destaque na tabela e, em seguida, as cruze para saber o número máximo de medicamentos que o idoso poderia tomar. Por último, verifique na questão 46 se (o) idoso(a) utiliza uma quantidade de medicamentos superior ao valor indicado na tabela. Assinale ao lado a respectiva resposta.]</b></p>
                            <Table>
                                <TableRow>
                                    <TableHead scope='col' rowSpan={2}>Nº de diagnósticos: 0</TableHead>
                                    <TableHead scope='col' colSpan={2}>Uso de medicamento inapropriado: 0</TableHead>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Sim</TableCell>
                                    <TableCell>Não</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>9</TableCell>
                                    <TableCell>18</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2</TableCell>
                                    <TableCell>6</TableCell>
                                    <TableCell>15</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>3</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>11</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>4</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>7</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>5</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>4</TableCell>
                                </TableRow>
                            </Table>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='medicine_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 9): {calcResult('medicine')}</p>
                            <p className="text-xl">Necessita de investigação?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {BooleanProps.map((prop, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={prop.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {prop.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <Button className='w-full mt-6' type='submit'>
                    Próximo
                </Button>
            </form>
        </Form>
    );
}

export default PageBiologicalForm;
