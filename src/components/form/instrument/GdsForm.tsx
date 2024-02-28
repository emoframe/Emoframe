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
import { FillEvaluationForm, RadioItem } from '@/types/forms';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const steps: StepConfig[] = [
    {label: 'Passo 1'},
    {label: 'Passo 2'},
] 

interface GdsQuestionsProps {
    field: "satisfied" | "no_activities" | "empty" | "upset" | "good" | "bad" | 
    "happy" | "helpless" | "stay_at_home" | "problems_of_memory" | "wonderful_to_stay_alive" | 
    "useless" | "full_of_energy" | "hopeless" | "unlucky",
    question: string,
    options: RadioItem[]
}

const PanasQuestions: GdsQuestionsProps[][] = [
    [
        {field: "satisfied", question: "Está satisfeito (a) com a sua vida?", options: [{value: '0', label: 'Sim'}, {value: '1', label: 'Não'}]},
        {field: "no_activities", question: "Interrompeu muitas de suas atividades?", options: [{value: '1', label: 'Sim'}, {value: '0', label: 'Não'}]},
        {field: "empty", question: "Acha sua vida vazia?", options: [{value: '1', label: 'Sim'}, {value: '0', label: 'Não'}]},
        {field: "upset", question: "Aborrece-se com frequência?", options: [{value: '1', label: 'Sim'}, {value: '0', label: 'Não'}]},
        {field: "good", question: "Sente-se bem com a vida na maior parte do tempo?", options: [{value: '0', label: 'Sim'}, {value: '1', label: 'Não'}]},
        {field: "bad", question: "Teme que algo ruim lhe aconteça?", options: [{value: '1', label: 'Sim'}, {value: '0', label: 'Não'}]},
        {field: "happy", question: "Sente-se alegre a maior parte do tempo?", options: [{value: '0', label: 'Sim'}, {value: '1', label: 'Não'}]},
        {field: "helpless", question: "Sente-se desamparado com frequência?", options: [{value: '1', label: 'Sim'}, {value: '0', label: 'Não'}]},
    ],
    [
        {field: "stay_at_home", question: "Prefere ficar em casa a sair e fazer coisas novas?", options: [{value: '0', label: 'Sim'}, {value: '1', label: 'Não'}]},
        {field: "problems_of_memory", question: "Acha que tem mais problemas de memória que as outras pessoas?", options: [{value: '0', label: 'Sim'}, {value: '1', label: 'Não'}]},
        {field: "wonderful_to_stay_alive", question: "Acha que é maravilhoso estar vivo (a)?", options: [{value: '0', label: 'Sim'}, {value: '1', label: 'Não'}]},
        {field: "useless", question: "Sente-se inútil?", options: [{value: '0', label: 'Sim'}, {value: '1', label: 'Não'}]},
        {field: "full_of_energy", question: "Sente-se cheio (a) de energia?", options: [{value: '0', label: 'Sim'}, {value: '1', label: 'Não'}]},
        {field: "hopeless", question: "Sente-se sem esperança?", options: [{value: '0', label: 'Sim'}, {value: '1', label: 'Não'}]},
        {field: "unlucky", question: "Acha que os outros têm mais sorte que você?", options: [{value: '0', label: 'Sim'}, {value: '1', label: 'Não'}]},
    ]
];

const PanasFormSchema = z.object({
    repulsion: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    tormented: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    scared: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    hearty: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    excited: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    guilty: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    enthusiastic: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    pleasantly_surprised: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    disturbed: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    trembling: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    active: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    proud: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    inspired: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    nervous: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    angry: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    determined: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    charmed: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    remorse: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    frightened: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    interested: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
})

const GdsForm = ({userId, evaluationId}: FillEvaluationForm) => {
    const form = useForm<z.infer<typeof PanasFormSchema>>({
        resolver: zodResolver(PanasFormSchema),
        defaultValues: {
            repulsion: '',
            tormented: '',
            scared: '',
            hearty: '',
            excited: '',
            guilty: '',
            enthusiastic: '',
            pleasantly_surprised: '',
            disturbed: '',
            trembling: '',
            active: '',
            proud: '',
            inspired: '',
            nervous: '',
            angry: '',
            determined: '',
            charmed: '',
            remorse: '',
            frightened: '',
            interested: '',
        }
    });

    const { push } = useRouter();
    const { toast } = useToast();
    const onSubmit = async (values: z.infer<typeof PanasFormSchema>) => {
        saveAnswer(values, evaluationId, userId).then(() => {push('/user/evaluations')})     
    }

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        PanasQuestions.forEach((questions) => (randomizeArray(questions)))
        console.log(PanasQuestions[0])
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
                
                <h1 className="font-bold text-4xl self-center"> ESCALA DE DEPRESSÃO GERIÁTRICA - GDS </h1>
                <h2 className="text-md self-center"> Aplicar o questionário computando as respostas que indicam como a pessoa tem se sentido na última semana.</h2>
                <h2 className="text-md self-center"> Assinalar SIM ou NÃO. Cada resposta deverá ser pontuada conforme o indicativo ao lado. O resultado final será a soma das 15 respostas.</h2>
                <Separator className="my-4"/>   
                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)}>
                            {
                                PanasQuestions[activeStep].map((question, index) => (
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
                                    PanasQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>Limpar</Button>

                                { 
                                    (activeStep != 1) ?
                                    <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                        const values = form.getValues(PanasQuestions[activeStep].map((question, index) => (question.field)));
                                        const hasNull = Object.values(values).some((value) => value === "");
                                        
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

export default GdsForm