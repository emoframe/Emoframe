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
import { Separator } from '@/components/ui/separator';;
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';

const DefaultProps = {
    Affirmative: [{ value: '1', label: '1 = SIM' }, { value: '0', label: '0 = NÃO' }],
    Negative: [{ value: '0', label: '0 = SIM' }, { value: '1', label: '1 = NÃO' }],
    Neutral: [{ value: '0', label: '0 = SIM' }, { value: '0', label: '0 = NÃO' }],
};

const BooleanProps = [{value: '1', label: 'SIM'}, {value: '0', label: 'NÃO'}];

const SocioenvironmentalFormSchema = z.object({
    support_55: z.object({
        spouse: z.enum(['', 'on']),
        parents: z.enum(['', 'on']),
        siblings: z.string(),
        children: z.string(),
        grandchildren: z.string(),
        greatgrandchildren: z.string(),
    }),
    support: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(8),
    support_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
    violence: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(8),
    violence_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
    environment: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(15),
    environment_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
});

const PageSocioenvironmentalForm = ({onSubmit}) => {
    const form = useForm<z.infer<typeof SocioenvironmentalFormSchema>>({
        resolver: zodResolver(SocioenvironmentalFormSchema),
        defaultValues: {
            support_55: {
                spouse: '',
                parents: '',
                siblings: '',
                children: '',
                grandchildren: '',
                greatgrandchildren: '',
            },
            support: ['', '', '', '', '', '', '', ''],
            support_result: '',
            violence: ['', '', '', '', '', '', '', ''],
            violence_result: '',
            environment: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            environment_result: '',
        }
    });

    const calcResult = section => form.watch(section).reduce((acc, e) => acc + (e ? Number(e) : 0), 0);
    
    return (
        <Form {...form}>
            <form className='flex flex-col flex-wrap justify-center gap-8 mt-8' onSubmit={form.handleSubmit(onSubmit)}>
                <h1 className="font-bold text-4xl self-center"> BAIXO SUPORTE SOCIAL </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='support_55'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">55 -O(a) senhor(a) tem:</p>
                            <p className="text-xl"><b>[Instruções: Fazer registro dos familiares vivos].</b></p>
                            <div className='flex flex-row gap-3 items-center'>
                                <FormControl>
                                    <Checkbox onChange={field.onChange} defaultValue={field.value.spouse} value={field.value.spouse}/>
                                </FormControl>
                                <FormLabel className="text-xl">Cônjuge</FormLabel>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <FormControl>
                                    <Checkbox onChange={field.onChange} defaultValue={field.value.parents} value={field.value.parents}/>
                                </FormControl>
                                <FormLabel className="text-xl">Pais</FormLabel>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <FormControl>
                                    <Input onChange={event => form.setValue('support_55.siblings', event.target.value)} />
                                </FormControl>
                                <FormLabel className="text-xl">irmãos (nª)</FormLabel>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <FormControl>
                                    <Input onChange={event => form.setValue('support_55.children', event.target.value)} />
                                </FormControl>
                                <FormLabel className="text-xl">filhos(nª)</FormLabel>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <FormControl>
                                    <Input onChange={event => form.setValue('support_55.grandchildren', event.target.value)} />
                                </FormControl>
                                <FormLabel className="text-xl">netos(nª)</FormLabel>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <FormControl>
                                    <Input onChange={event => form.setValue('support_55.greatgrandchildren', event.target.value)} />
                                </FormControl>
                                <FormLabel className="text-xl">bisnetos (n°)</FormLabel>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='support.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">56-O(a) senhor(a) encontra pessoas que gosta com frequência?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='support.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">57-O(a) senhor(a) participa de decisões tomadas pela sua família?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='support.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">58-O(a) senhor(a) se sente satisfeito(a) com os seus relacionamentos afetivos?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='support.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">59-O(a) senhor(a) pode contar com alguém se precisar de dinheiro?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='support.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">60-O(a) senhor(a) pode contar com alguém para ajudá-lo(a) a resolver problemas?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='support.5'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">61-O(a) senhor(a) tem pessoas com quem possa se divertir e relaxar?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='support.6'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">62-O (a) senhor(a) participa de eventos socioculturais, tais como: peças de teatro, cinema, universidade aberta a terceira idade, centro de convivência, festas, ligado à religião etc.).</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='support.7'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">63-O(a) senhor(a) é atendido regularmente por serviços de saúde?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='support_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 8): {calcResult('support')}</p>
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
                <h1 className="font-bold text-4xl self-center"> VIOLÊNCIA </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='violence.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">64-O(a) senhor(a) tem medo de alguém do seu convívio?</p>
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
                    name='violence.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">65-O(a) senhor se sente abandonado?</p>
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
                    name='violence.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">66-Alguém tem falado com o(a) senhor(a) de forma que se sinta mal consigo mesmo(a)?</p>
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
                    name='violence.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">67-Alguém tem agredido o(a) senhor(a) fisicamente?</p>
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
                    name='violence.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">68-O(a) senhor tem passado necessidades (de roupas, alimentação, medicamentos ou outras)?</p>
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
                    name='violence.5'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">69-Alguém tem usado o dinheiro do(a) senhor(a) sem a sua autorização?</p>
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
                    name='violence.6'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">70-Alguém do seu convívio já tocou o corpo do(a) senhor(a) sem o seu consentimento?</p>
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
                    name='violence.7'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">71-O(a) senhor está deixando de cuidar de si próprio?</p>
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
                    name='violence_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 8): {calcResult('violence')}</p>
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
                <h1 className="font-bold text-4xl self-center"> PROBLEMAS AMBIENTAIS </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='environment.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">72-Na casa do(a) senhor(a), os móveis próximos as áreas de circulação são estáveis (firmes)?</p>
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
                    name='environment.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">73-Na casa do(a) senhor(a), há objetos (chinelos, brinquedos, tapetes, etc) soltos nas áreas de circulação?</p>
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
                    name='environment.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">74-Na casa do(a) senhor(a), o piso é escorregadio (ex. encerado, molhado)?</p>
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
                    name='environment.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">75-Na casa do(a) senhor(a), há tapetes antiderrapantes (fora e dentro do box)?</p>
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
                    name='environment.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">76-Na casa do(a) senhor(a), há escadas?<b>[Instruções: item sem pontuação. Se não houver escadas, pular as próximas duas questões e pontuá-las positivamente.]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Neutral.map((defaultProp, index) => (
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
                    name='environment.5'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">77-Na casa do(a) senhor(a), as escadas são iluminadas?</p>
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
                    name='environment.6'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">78-Na casa do(a) senhor(a), as escadas possuem corrimãos em ambos os lados?</p>
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
                    name='environment.7'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">79-O(a) senhor(a) costuma subir em banquetas ou cadeiras para alcançar objetos altos?</p>
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
                    name='environment.8'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">80-O(a) senhor(a) costuma acender as luzes ao levantar-se à noite?</p>
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
                    name='environment.9'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">81-O(a) senhor(a) costuma utilizar calçados seguros e adequados (solado antiderrapante, bem ajustados e firmes no pé, sem saltos etc)?</p>
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
                    name='environment.10'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">82-As calçadas próximas à sua residência são bem cuidadas (pavimentadas, lisas e sem buracos)?</p>
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
                    name='environment.11'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">83-No seu bairro, o transporte público é acessível?</p>
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
                    name='environment.12'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">84-No seu bairro, o comércio é acessível?</p>
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
                    name='environment.13'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">85-No seu bairro, há facilidade e prazer em andar (a pé/com cadeiras de rodas/bengala/ andador)?</p>
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
                    name='environment.14'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">86-No seu bairro, a diversão (restaurantes, cinema, clubes, etc) é acessível?</p>
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
                    name='environment.15'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">87-O seu bairro é seguro?</p>
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
                    name='environment_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 15): {calcResult('environment')}</p>
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

export default PageSocioenvironmentalForm;
