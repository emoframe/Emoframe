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
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/loading";
import { zodResolver } from '@hookform/resolvers/zod';
import { useStepper } from '@/components/ui/hooks/use-stepper'
import { Steps, Step, StepConfig } from '@/components/ui/stepper';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RadioItem {
    value: string;
    label: string;
}

const DefaultProps: RadioItem[] = [
    {value: '1', label: 'Não tem a ver comigo'},
    {value: '2', label: 'Tem pouco a ver comigo'},
    {value: '3', label: 'Ás vezes tem e às vezes não tem a ver comigo'},
    {value: '4', label: 'Tem muito a ver comigo'},
    {value: '5', label: 'Tem tudo a ver comigo'},
]

const steps: StepConfig[] = [
    {label: 'Passo 1'},
    {label: 'Passo 2'},
]

const EazFormSchema = z.object({
    happy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    tired: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    worried: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    confident: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    courageous: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    nervous: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    determined: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    guilty: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    passionate: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    angry: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    brave: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    open_new_things: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    happy_person: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    easy_to_anger:  z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    proud_about_myself: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    humiliated: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    sad: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    grumpy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    rage: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    resilient: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})})
})

type FieldType = "happy" | "tired" | "worried" | "confident" | "courageous" | "nervous" | "determined" | "guilty" | "passionate" | "angry" | "brave" | "open_new_things" | "happy_person" | "easy_to_anger" | "proud_about_myself" | "humiliated" | "sad" | "grumpy" | "rage" | "resilient"

interface EazQuestionsProps {
    field: FieldType,
    question: string,
}

const EazQuestionsFirstPage: EazQuestionsProps[] = [
    {field: "happy", question: "Muitas situações me deixaram alegre nos últimos tempos."},
    {field: "tired", question: "Tenho me sentido cansado(a) nos últimos meses."},
    {field: "worried", question: "Ando muito preocupado(a) nos últimos tempos."},
    {field: "confident", question: "Me sinto confiante no dia a dia."},
    {field: "courageous", question: "Sou corajoso(a)."},
    {field: "nervous", question: "Muitas vezes, eu fico nervoso(a)."},
    {field: "determined", question: "Sou determinado(a) para conseguir o que quero."},
    {field: "guilty", question: "Me sinto culpado(a) por coisas que fiz no passado."},
    {field: "passionate", question: "Sou apaixonado(a) por algumas coisas que faço."},
    {field: "angry", question: "Fico zangado(a) quando sou contrariado(a)."},
]

const EazQuestionsSecondPage: EazQuestionsProps[] = [
    {field: "brave", question: "Sou valente quando estou diante de um desafio."},
    {field: "open_new_things", question: "Me dá prazer experimentar coisas novas."},
    {field: "happy_person", question: "Sou uma pessoa feliz."},
    {field: "easy_to_anger", question: "Eu me irrito facilmente."},
    {field: "proud_about_myself", question: "Sinto orgulho de mim mesmo(a)."},
    {field: "humiliated", question: "Nos últimos tempos ocorreram situações em que me senti humilhado(a)."},
    {field: "sad", question: "Tenho me sentido triste ultimamente."},
    {field: "grumpy", question: "As pessoas dizem que sou mal-humorado(a)."},
    {field: "rage", question: "Ultimamente ocorreram situações em que senti muita raiva de algumas pessoas."},
    {field: "resilient", question: "Em geral eu me sinto forte para superar as dificuldades da vida."},
]

const EazQuestions: EazQuestionsProps[][] = [
    EazQuestionsFirstPage,
    EazQuestionsSecondPage,
]

const EazForm = ({userId}) => {
    const form = useForm<z.infer<typeof EazFormSchema>>({
        resolver: zodResolver(EazFormSchema),
        defaultValues: {
            happy: '',
            tired: '',
            worried: '',
            confident: '',
            courageous: '',
            nervous: '',
            determined: '',
            guilty: '',
            passionate: '',
            angry: '',
            brave: '',
            open_new_things: '',
            happy_person: '',
            easy_to_anger:  '',
            proud_about_myself: '',
            humiliated: '',
            sad: '',
            grumpy: '',
            rage: '',
            resilient: ''
        }
    });

    const { push } = useRouter();

    const [isReady, setIsReady] = React.useState(false);

    const onSubmit = async (values: z.infer<typeof EazFormSchema>) => {
        createForm(values, userId, "Brums").then(() => {push('/profile')})     
    }

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    });

    if(!isReady) return null;
    switch (activeStep) {
        case 0:
            return (
                <React.Suspense fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <Steps activeStep={activeStep}>
                            {steps.map((step, index) => ( <Step index={index} key={index} {...step} /> ))}
                        </Steps>
                        <form key={activeStep}>
                            <div key="title" className="flex flex-col flex-wrap justify-center gap-8">
                                <h1 className="font-bold text-4xl self-center mt-10"> BRUMS </h1>
                                <h2 className="text-2xl self-center"> Abaixo está uma lista de palavras que descrevem sentimentos. Por favor, leia tudo atenciosamente. Em seguida assinale, em cada linha, o quadrado que melhor descreve COMO VOCÊ SE SENTE AGORA. Tenha certeza de sua resposta para cada questão, antes de assinalar. </h2>
                                <h2 className="text-2xl self-center"> Clique no botão abaixo para ver exemplos de preenchimento: </h2>
                                <div key="examples" className="flex flex-row justify-around">
                                    <Button className="basis-full" type="button">Exemplos</Button>
                                </div>
                                <div key="sep">
                                    <hr className="text-black bg-slate-300 h-0.5"/>
                                </div>
                                <h2 className="text-2xl self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>
                                {EazQuestions[activeStep].map((question, index) => (
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
                                <div key="buttons" className="flex flex-row justify-around mt-8">
                                    <Button className="basis-1/8 text-lg" type='button' onClick={() => {
                                        EazQuestions[activeStep].map((question) => (form.setValue(question.field, '')));
                                        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                    }}>Limpar</Button>
                                    <Button className="basis-1/8 text-lg" type="button" onClick={() => {
                                        const values = form.getValues(EazQuestions[activeStep].map((question) => question.field));
                                        const hasNull = Object.values(values).some((value) => value === "");
                                        
                                        if (hasNull) {
                                            alert("Preencha todos os campos!");
                                        }
                                        else{
                                        nextStep();
                                    }}}>Próximo</Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                    </React.Suspense>
                )
        case 1: 
            return (
                <React.Suspense fallback={<Progress />}>
                <Form key={activeStep} {...form}>
                    <Steps activeStep={activeStep}>
                        {steps.map((step, index) => ( <Step index={index} key={index} {...step} /> ))}
                    </Steps>
                    <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col flex-wrap justify-center gap-8">
                            <h1 className="font-bold text-4xl self-center mt-10"> BRUMS </h1>
                            <h2 className="text-2xl self-center"> Abaixo está uma lista de palavras que descrevem sentimentos. Por favor, leia tudo atenciosamente. Em seguida assinale, em cada linha, o quadrado que melhor descreve COMO VOCÊ SE SENTE AGORA. Tenha certeza de sua resposta para cada questão, antes de assinalar. </h2>
                            <h2 className="text-2xl self-center"> Clique no botão abaixo para ver exemplos de preenchimento: </h2>
                            <div className="flex flex-row justify-around">
                                <Button className="basis-full" type="button">Exemplos</Button>
                            </div>
                            <div>
                                <hr className="text-black bg-slate-300 h-0.5"/>
                            </div>
                            <h2 className="text-2xl self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>
                            {EazQuestions[activeStep].map((question, index) => (
                                <>
                                <FormField
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
                                <div key={index}>
                                    <hr className="text-black bg-black h-0.5"/>
                                </div>    
                                </>
                            ))}
                            <div className="flex flex-row justify-around mt-8">
                                <Button className="basis-1/8 text-lg" type="button" onClick={() => {    
                                    prevStep();
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>Anterior</Button>
                                <Button className="basis-1/8 text-lg" type='button' onClick={() => {
                                    EazQuestions[activeStep].map((question) => (form.setValue(question.field, '')));
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>Limpar</Button>
                                <Button className="basis-1/8 text-lg" type="submit">Enviar</Button>
                            </div>
                        </div>
                    </form>
                </Form>
                </React.Suspense>
            )
    }
}

export default EazForm