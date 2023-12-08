'use client';

import React from 'react'

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
import { useRouter } from 'next/navigation';
import { createForm } from '@/lib/firebase'; 
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/loading";
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RadioItem {
    value: string;
    label: string;
}

const DefaultProps: RadioItem[] = [
    {value: '5', label: 'Concordo Plenamente'},
    {value: '4', label: 'Concordo Parcialmente'},
    {value: '3', label: 'Neutro'},
    {value: '2', label: 'Discordo Parcialmente'},
    {value: '1', label: 'Discordo Totalmente'},
]

const SusFormSchema = z.object({
    solution_evaluation: z.string().min(1, "Insira o nome da solução"),
    app_useFrequency: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    app_useComplex: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    app_useEasy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    app_useNeedHelp: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    app_functionIntegration: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    app_inconsistency: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    app_learningCurve: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    app_jumbled: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    app_confidence: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    app_learnSystem: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})})
})

const SusForm = ({userId}) => {
    const form = useForm<z.infer<typeof SusFormSchema>>({
        resolver: zodResolver(SusFormSchema),
        defaultValues: {
            solution_evaluation: '',
            app_useFrequency: '',
            app_useComplex: '',
            app_useEasy: '',
            app_useNeedHelp: '',
            app_functionIntegration: '',
            app_inconsistency: '',
            app_learningCurve: '',
            app_jumbled: '',
            app_confidence: '',
            app_learnSystem: ''
        }
    });

    const { push } = useRouter();

    const onSubmit = async (values: z.infer<typeof SusFormSchema>) => {
        createForm(values, userId, "Sus").then(() => {push('/profile')})     
    }

    return (
        <React.Suspense fallback={<Progress />}>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col flex-wrap justify-center gap-8">
                    <h1 className="font-bold text-4xl self-center mt-10"> SUS </h1>
                    <FormField
                        control={form.control}
                        name='solution_evaluation'
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Para cada uma das seguintes afirmações, selecione a opção que melhor descreve suas reações à solução descrita.</FormLabel>
                            <FormControl>
                                <Input placeholder='Nome da Solução' {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <h2 className="text-2xl self-center"> Clique no botão abaixo para ver exemplos de preenchimento: </h2>
                    <div className="flex flex-row justify-around">
                        <Button className="basis-full" type="button">Exemplos</Button>
                    </div>
                    <div>
                        <hr className="text-black bg-slate-300 h-0.5"/>
                    </div>
                    <h2 className="text-2xl self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>
                    <FormField
                    control={form.control}
                    name="app_useFrequency"
                    render={({field}) => (
                    <FormItem className="space-x-5 space-y-5 content-center">
                            <FormLabel className="text-2xl"><b>Eu acho que gostaria de usar esse sistema com frequência.</b></FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((app_useFrequency, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={app_useFrequency.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {app_useFrequency.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div>
                        <hr className="text-black bg-black h-0.5"/>
                    </div>
                    <FormField
                    control={form.control}
                    name="app_useComplex"
                    render={({field}) => (
                    <FormItem className="space-x-5 space-y-5 content-center">
                            <FormLabel className="text-2xl"><b>Eu acho o sistema desnecessariamente complexo.</b></FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((app_useComplex, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={app_useComplex.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {app_useComplex.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div>
                        <hr className="text-black bg-black h-0.5"/>
                    </div>
                    <FormField
                    control={form.control}
                    name="app_useEasy"
                    render={({field}) => (
                    <FormItem className="space-x-5 space-y-5 content-center">
                            <FormLabel className="text-2xl"><b>Eu achei o sistema fácil de usar.</b></FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((app_useEasy, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={app_useEasy.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {app_useEasy.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div>
                        <hr className="text-black bg-black h-0.5"/>
                    </div>
                    <FormField
                    control={form.control}
                    name="app_useNeedHelp"
                    render={({field}) => (
                    <FormItem className="space-x-5 space-y-5 content-center">
                            <FormLabel className="text-2xl"><b>Eu acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o sistema.</b></FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((app_useNeedHelp, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={app_useNeedHelp.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {app_useNeedHelp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div>
                        <hr className="text-black bg-black h-0.5"/>
                    </div>
                    <FormField
                    control={form.control}
                    name="app_functionIntegration"
                    render={({field}) => (
                    <FormItem className="space-x-5 space-y-5 content-center">
                            <FormLabel className="text-2xl"><b>Eu acho que as várias funções do sistema estão muito bem integradas.</b></FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((app_functionIntegration, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={app_functionIntegration.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {app_functionIntegration.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div>
                        <hr className="text-black bg-black h-0.5"/>
                    </div>
                    <FormField
                    control={form.control}
                    name="app_inconsistency"
                    render={({field}) => (
                    <FormItem className="space-x-5 space-y-5 content-center">
                            <FormLabel className="text-2xl"><b>Eu acho que o sistema apresenta muita inconsistência.</b></FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((app_inconsistency, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={app_inconsistency.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {app_inconsistency.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div>
                        <hr className="text-black bg-black h-0.5"/>
                    </div>
                    <FormField
                    control={form.control}
                    name="app_learningCurve"
                    render={({field}) => (
                    <FormItem className="space-x-5 space-y-5 content-center">
                            <FormLabel className="text-2xl"><b>Eu imagino que as pessoas aprenderão como usar esse sistema rapidamente.</b></FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((app_learningCurve, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={app_learningCurve.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {app_learningCurve.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div>
                        <hr className="text-black bg-black h-0.5"/>
                    </div>
                    <FormField
                    control={form.control}
                    name="app_jumbled"
                    render={({field}) => (
                    <FormItem className="space-x-5 space-y-5 content-center">
                            <FormLabel className="text-2xl"><b>Eu achei o sistema atrapalhado de usar.</b></FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((app_jumbled, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={app_jumbled.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {app_jumbled.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div>
                        <hr className="text-black bg-black h-0.5"/>
                    </div>
                    <FormField
                    control={form.control}
                    name="app_confidence"
                    render={({field}) => (
                    <FormItem className="space-x-5 space-y-5 content-center">
                            <FormLabel className="text-2xl"><b>Eu me senti confiante ao usar o sistema.</b></FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((app_confidence, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={app_confidence.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {app_confidence.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div>
                        <hr className="text-black bg-black h-0.5"/>
                    </div>
                    <FormField
                    control={form.control}
                    name="app_learnSystem"
                    render={({field}) => (
                    <FormItem className="space-x-5 space-y-5 content-center">
                            <FormLabel className="text-2xl"><b>Eu precisei aprender várias coisas novas antes de conseguir usar o sistema.</b></FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((app_learnSystem, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={app_learnSystem.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {app_learnSystem.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>)
                        }
                    />
                    <div>
                        <hr className="text-black bg-black h-0.5"/>
                    </div>
                    <div className="flex flex-row justify-around mt-8">
                        <Button className="basis-1/8 text-lg" type='button' onClick={() => {form.reset()}}>Limpar</Button>
                        <Button className="basis-1/8 text-lg" type="submit">Enviar</Button>
                    </div>
                </div>
            </form>
        </Form>
        </React.Suspense>
        )
}

export default SusForm