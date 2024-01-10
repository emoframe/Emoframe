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

// Write a type called FieldType getting all fields from SusFormSchema putting them as a string with | between them

type FieldType = "solution_evaluation" | "app_useFrequency" | "app_useComplex" | "app_useEasy" | "app_useNeedHelp" | "app_functionIntegration" | "app_inconsistency" | "app_learningCurve" | "app_jumbled" | "app_confidence" | "app_learnSystem" 

interface SusQuestionsProps {
    field: FieldType,
    question: string,
}


const SusQuestions: SusQuestionsProps[] = [
    {field: "app_useFrequency", question: "Eu acho que gostaria de usar esse sistema com frequência."},
    {field: "app_useComplex", question: "Eu acho o sistema desnecessariamente complexo."},
    {field: "app_useEasy", question: "Eu achei o sistema fácil de usar."},
    {field: "app_useNeedHelp", question: "Eu acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o sistema."},
    {field: "app_functionIntegration", question: "Eu acho que as várias funções do sistema estão muito bem integradas."},
    {field: "app_inconsistency", question: "Eu acho que o sistema apresenta muita inconsistência."},
    {field: "app_learningCurve", question: "Eu imagino que as pessoas aprenderão como usar esse sistema rapidamente."},
    {field: "app_jumbled", question: "Eu achei o sistema atrapalhado de usar."},
    {field: "app_confidence", question: "Eu me senti confiante ao usar o sistema."},
    {field: "app_learnSystem", question: "Eu precisei aprender várias coisas novas antes de conseguir usar o sistema."},
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
            app_learnSystem: '',
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
                    {SusQuestions.map((question, index) => (
                        <>
                        <FormField key={"formField" + index}
                        control={form.control}
                        name={question.field}
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <p className="text-2xl"><b>{question.question}</b></p>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((defaultProp, index) => (
                                        <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={defaultProp.value}/> 
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {defaultProp.label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                        </FormItem>
                        )} />
                        <div key={"div" + index}>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>    
                        </>
                    ))}
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