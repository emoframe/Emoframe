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
import { randomizeArray } from '@/lib/utils';
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
    {value: '1', label: 'Nada'},
    {value: '2', label: 'Um pouco'},
    {value: '3', label: 'Moderadamente'},
    {value: '4', label: 'Bastante'},
    {value: '5', label: 'Extremamente'},
]

const steps: StepConfig[] = [
    {label: 'Passo 1'},
    {label: 'Passo 2'},
    {label: 'Passo 3'},
]

const BrumsFormSchema = z.object({
    cheered_up: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    irritated: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    depressed: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    terrified: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    crestfallen: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    broken_down: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    confused: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    exhausted: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    anxious: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    unhappy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    huffy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    worried: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    sad: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    sleepy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    insecure: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    willing: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    tense: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    disoriented: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    grumpy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    undecided: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    tired: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    energy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    angry: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    alert: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
})

type FieldType = 'cheered_up' | 'irritated' | 'depressed' | 'terrified' | 'crestfallen' | 'broken_down' | 'confused' | 'exhausted' | 'anxious' | 'unhappy' | 'huffy' | 'worried' | 'sad' | 'sleepy' | 'insecure' | 'willing' | 'tense' | 'disoriented' | 'grumpy' | 'undecided' | 'tired' | 'energy' | 'angry' | 'alert';

interface BrumsQuestionsProps {
    field: FieldType,
    question: string,
}

const BrumsQuestionsFirstPage: BrumsQuestionsProps[] = [
    {field: 'cheered_up', question: 'Animado(a)'},
    {field: 'irritated', question: 'Irritado(a)'},
    {field: 'depressed', question: 'Deprimido(a)'},
    {field: 'terrified', question: 'Apavorado(a)'},
    {field: 'crestfallen', question: 'Desanimado(a)'},
    {field: 'broken_down', question: 'Esgotado(a)'},
    {field: 'confused', question: 'Confuso(a)'},
    {field: 'exhausted', question: 'Exausto(a)'},
]

const BrumsQuestionsSecondPage: BrumsQuestionsProps[] = [
    {field: 'anxious', question: 'Ansioso(a)'},
    {field: 'unhappy', question: 'Infeliz(a)'},
    {field: 'huffy', question: 'Zangado(a)'},
    {field: 'worried', question: 'Preocupado(a)'},
    {field: 'sad', question: 'Triste(a)'},
    {field: 'sleepy', question: 'Sonolento(a)'},
    {field: 'insecure', question: 'Inseguro(a)'},
]

const BrumsQuestionsThirdPage: BrumsQuestionsProps[] = [
    {field: 'willing', question: 'Disposto(a)'},
    {field: 'tense', question: 'Tenso(a)'},
    {field: 'disoriented', question: 'Desorientado(a)'},
    {field: 'grumpy', question: 'Mal-humorado(a)'},
    {field: 'undecided', question: 'Indeciso(a)'},
    {field: 'tired', question: 'Cansado(a)'},
    {field: 'energy', question: 'Energético(a)'},
    {field: 'angry', question: 'Bravo(a)'},
    {field: 'alert', question: 'Alerta'},
]

const BrumsQuestions: BrumsQuestionsProps[][] = [
    BrumsQuestionsFirstPage,
    BrumsQuestionsSecondPage,
    BrumsQuestionsThirdPage
]

const BrumsForm = ({userId}) => {
    const form = useForm<z.infer<typeof BrumsFormSchema>>({
        resolver: zodResolver(BrumsFormSchema),
        defaultValues: {
            cheered_up: '',
            irritated: '',
            depressed: '',
            terrified: '',
            crestfallen: '',
            broken_down: '',
            confused: '',
            exhausted: '',
            anxious: '',
            unhappy: '',
            huffy: '',
            worried: '',
            sad: '',
            sleepy: '',
            insecure: '',
            willing: '',
            tense: '',
            disoriented: '',
            grumpy: '',
            undecided: '',
            tired: '',
            energy: '',
            angry: '',
            alert: '',
        }
    });

    const { push } = useRouter();

    const [isReady, setIsReady] = React.useState(false);

    const onSubmit = async (values: z.infer<typeof BrumsFormSchema>) => {
        createForm(values, userId, "Brums").then(() => {push('/profile')})     
    }

    React.useEffect(() => {
        BrumsQuestions.forEach((questions) => (randomizeArray(questions)))
        console.log(BrumsQuestions[0])
        setIsReady(true);
    }, []);

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
                                {BrumsQuestions[activeStep].map((question, index) => (
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
                                        BrumsQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                    }}>Limpar</Button>
                                    <Button className="basis-1/8 text-lg" type="button" onClick={() => {
                                        const values = form.getValues(["cheered_up", "irritated", "depressed", "terrified", "crestfallen", "broken_down", "confused", "exhausted"]);
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
                    <form key={activeStep}>
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
                            {BrumsQuestions[activeStep].map((question, index) => (
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
                                    BrumsQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>Limpar</Button>
                                <Button className="basis-1/8 text-lg" type="button" onClick={() => {
                                    const values = form.getValues(["cheered_up", "irritated", "depressed", "terrified", "crestfallen", "broken_down", "confused", "exhausted"]);
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
        case 2:
            return (
                <React.Suspense fallback={<Progress />}>
                <Form key={activeStep} {...form}>
                    <Steps activeStep={activeStep}>
                        {steps.map((step, index) => ( <Step index={index} key={index} {...step} /> ))}
                    </Steps>
                    <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)}>
                        <div key="title" className="flex flex-col flex-wrap justify-center gap-8">
                            <h1 className="font-bold text-4xl self-center mt-10"> BRUMS </h1>
                            <h2 className="text-2xl self-center"> Abaixo está uma lista de palavras que descrevem sentimentos. Por favor, leia tudo atenciosamente. Em seguida assinale, em cada linha, o quadrado que melhor descreve COMO VOCÊ SE SENTE AGORA. Tenha certeza de sua resposta para cada questão, antes de assinalar. </h2>
                            <h2 className="text-2xl self-center"> Clique no botão abaixo para ver exemplos de preenchimento: </h2>
                            <div key="examples" className="flex flex-row justify-around">
                                <Button className="basis-full" type="button">Exemplos</Button>
                            </div>
                            <div key="sep1">
                                <hr className="text-black bg-slate-300 h-0.5"/>
                            </div>
                            <h2 className="text-2xl self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>
                            {BrumsQuestions[activeStep].map((question, index) => (
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
                            <div key="buttons" className="flex flex-row justify-around mt-8">
                                <Button className="basis-1/8 text-lg" type="button" onClick={() => {    
                                    prevStep();
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>Anterior</Button>
                                <Button className="basis-1/8 text-lg" type='button' onClick={() => {
                                    BrumsQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
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

export default BrumsForm