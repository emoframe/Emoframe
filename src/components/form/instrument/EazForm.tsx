'use client';

import React, { useEffect, useState } from 'react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '../../ui/form';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { saveAnswer } from '@/lib/firebase'; 
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { zodResolver } from '@hookform/resolvers/zod';
import { useStepper } from "@/components/ui/hooks/use-stepper";
import { Steps, Step, StepConfig } from '@/components/ui/stepper';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { randomizeArray } from '@/lib/utils';
import { FillEvaluationForm } from '@/types/forms';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

interface RadioItem {
    value: string;
    label: string;
}

const DefaultProps: RadioItem[] = [
    {value: '1', label: '1 (Nada ou muito ligeiramente)'},
    {value: '2', label: '2 (Um pouco)'},
    {value: '3', label: '3 (Moderadamente)'},
    {value: '4', label: '4 (Bastante)'},
    {value: '5', label: '5 (Extremamente)'},
]

const steps: StepConfig[] = [
    {label: 'Passo 1'},
    {label: 'Passo 2'},
] 

interface EazQuestionsProps {
    field: "happy" | "tired" | "worried" | "confident" | "courageous" | 
    "nervous" | "determined" | "guilty" | "passionate" | "angry" | "brave" | 
    "open_new_things" | "happy_person" | "easy_to_anger" | "proud_about_myself" | 
    "humiliated" | "sad" | "grumpy" | "rage" | "resilient",
    question: string,
}

const EazQuestions: EazQuestionsProps[][] = [
  [
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
  ],
  [
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
];

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

const EazForm = (props: FillEvaluationForm) => {
    const FormSchema = !("isViewable" in props) ? EazFormSchema : z.object({}); 
    const form = useForm<z.infer<typeof EazFormSchema>>({
        resolver: zodResolver(FormSchema),
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
    const { toast } = useToast();
    const onSubmit = async (values: z.infer<typeof EazFormSchema>) => {
        if(!("isViewable" in props)) {
            saveAnswer(values, props.evaluationId, props.userId).then(() => {
                toast({
                    title: "Socilitação aprovada",
                    description: "Avaliação preenchida e salva",
                });
                push('/user/evaluations');
            });  
        }   
    }

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        EazQuestions.forEach((questions) => (randomizeArray(questions)))
        setIsReady(true);
    }, []);

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    })

    if(!isReady) return null;
    return (
        <div>
            <Steps activeStep={activeStep}>
                {steps.map((step, index) => ( <Step index={index} key={index} additionalClassName={{label: "text-md"}} {...step} /> ))}
            </Steps>
           
            <div className="flex flex-col flex-wrap justify-center gap-8">
                
                <h1 className="font-bold text-4xl self-center"> EAZ </h1>
                <h2 className="text-md self-center"> Abaixo está uma lista de palavras que descrevem sentimentos. Por favor, leia tudo atenciosamente. Em seguida assinale, em cada linha, o quadrado que melhor descreve COMO VOCÊ SE SENTE AGORA. Tenha certeza de sua resposta para cada questão, antes de assinalar. </h2>
                <h2 className="text-md self-center">  Clique no botão abaixo para ver exemplos de preenchimento: </h2>

                <div className="flex flex-row justify-around">
                    <Button className="text-lg basis-1/3" type="button" size="lg">Exemplos</Button>
                </div>
                <Separator className="my-4"/>   
                <h2 className="text-md self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>

                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)}>
                            {
                                EazQuestions[activeStep].map((question, index) => (
                                    <>
                                        <FormField key={"formField" + index}
                                        control={form.control}
                                        name={question.field}
                                        render={({field}) => (
                                            <FormItem className="space-x-5 space-y-5 content-center">
                                                <p className="text-xl"><b>{question.question}</b></p>
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
                                                            <FormLabel className="font-normal text-md">
                                                                {defaultProp.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                        </FormItem>
                                        )} />
                                        <Separator className="mb-8"/>   
                                    </>
                                ))
                            }
                            <div key="buttons" className="flex flex-row justify-around mt-8">
                                { 
                                    (activeStep != 0) && 
                                    <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {    
                                        prevStep();
                                        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                    }}>Anterior</Button>
                                }
                                
                                <Button className="basis-1/8 text-lg" type='button' size="lg" onClick={() => {
                                    EazQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>Limpar</Button>

                                { 
                                    (activeStep != 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const values = form.getValues(EazQuestions[activeStep].map((question, index) => (question.field)));
                                            const hasNull = !("isViewable" in props) ? Object.values(values).some((value) => value === "") : false;
                                            
                                            if (hasNull) {
                                                toast({
                                                    title: "Socilitação negada",
                                                    description: "Preencha todos os campos!",
                                                });
                                            }
                                            else{
                                                nextStep();
                                                window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                            }
                                        }}>Próximo</Button>
                                    : <Button className="basis-1/8 text-lg" type="submit" size="lg">Enviar</Button>
                                }
                            </div>
                        </form>
                    </Form>
                </React.Suspense>
            </div>
       </div>
    );
}

export default EazForm