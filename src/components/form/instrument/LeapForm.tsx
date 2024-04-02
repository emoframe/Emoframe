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

const DefaultProps: RadioItem[] = [
    {value: 1, label: '1 (Nada ou muito ligeiramente)'},
    {value: 2, label: '2 (Um pouco)'},
    {value: 3, label: '3 (Moderadamente)'},
    {value: 4, label: '4 (Bastante)'},
    {value: 5, label: '5 (Extremamente)'},
]

const steps: StepConfig[] = [
    {label: 'Passo 1'},
    {label: 'Passo 2'},
    {label: 'Passo 3'},
    {label: 'Passo 4'},
] 

interface LeapQuestionsProps {
    field: "admiration" | "relieved" | "tired" | "happy" | "accept" | "heat" | "satisfied" | "jealous" | "attracted" | "calm" | "funny" | "desire" | "careful" | "strange" | "hopeful" | "fall_in_love" | "conformed" | "hungry" | "guilty" | "cold" | "despise" | "take_pity_on" | "disgusting" | "need" | "duty" | "envy" | "humiliated" | "interested" | "fear" | "proud" | "shame" | "angry" | "sleepy" | "longing" | "sad" | "surprised" | "thirst" | "thoughtful" | "serious" | "scared",
    question: string,
}

const LeapQuestions: LeapQuestionsProps[][] = [
    [
        {field: "admiration", question: "Sinto uma admiração por alguém."},
        {field: "relieved",   question: "Estou aliviado(a)."},
        {field: "tired",      question: "Estou cansado(a)."},
        {field: "happy",        question: "Estou alegre."},
        {field: "accept",     question: "Estou aceitando alguma coisa."},
        {field: "heat",       question: "Estou com calor."},
        {field: "satisfied",  question: "Estou cheio(a)."},
        {field: "jealous",    question: "Sinto ciúme de alguém."},
        {field: "attracted",  question: "Sinto atração sexual por alguém."},
        {field: "calm",       question: "Sinto-me calmo(a)."},
    ],
    [
        {field: "funny",        question: "Acho algo engraçado."},
        {field: "desire",       question: "Sinto um desejo."},
        {field: "careful",      question: "Estou tomando cuidado."},
        {field: "strange",      question: "Acho algo estranho."},
        {field: "hopeful",      question: "Estou com esperança."},
        {field: "fall_in_love", question: "Estou gostando de alguém."},
        {field: "conformed",    question: "Estou conformado(a)."},
        {field: "hungry",       question: "Estou com fome."},
        {field: "guilty",       question: "Sinto-me culpado(a)."},
        {field: "cold",         question: "Estou com frio."},
    ],
    [
        {field: "despise",      question: "Faço pouco caso de alguém."},
        {field: "take_pity_on", question: "Tenho pena de alguém."},
        {field: "disgusting",   question: "Estou com nojo."},
        {field: "need",         question: "Sinto uma necessidade."},
        {field: "duty",         question: "Sinto uma obrigação."},
        {field: "envy",         question: "Sinto inveja de alguém."},
        {field: "humiliated",   question: "Sinto-me humilhado(a)."},
        {field: "interested",   question: "Sinto-me interessado(a)."},
        {field: "fear",         question: "Estou com medo."},
        {field: "proud",        question: "Sinto-me orgulhoso(a)."},
    ],
    [
        {field: "shame",      question: "Estou com vergonha."},
        {field: "angry",      question: "Sinto raiva."},
        {field: "sleepy",     question: "Estou com sono."},
        {field: "longing",    question: "Sinto saudade de alguém."},
        {field: "sad",        question: "Sinto-me triste."},
        {field: "surprised",  question: "Sinto-me surpreso(a)."},
        {field: "thirst",     question: "Estou com sede."},
        {field: "thoughtful", question: "Estou refletindo."},
        {field: "serious",    question: "Estou sem graça."},
        {field: "scared",     question: "Estou assustado(a)."},
    ]
];

const LeapFormSchema = z.object({
    admiration: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    relieved: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    tired: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    happy: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    accept: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    heat: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    satisfied: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    jealous: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    attracted: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    calm: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    funny: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    desire: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    careful: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    strange: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    hopeful: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    fall_in_love: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    conformed: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    hungry: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    guilty: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    cold: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    despise: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    take_pity_on: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    disgusting: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    need: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    duty: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    envy: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    humiliated: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    interested: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    fear: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    proud: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    shame: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    angry: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    sleepy: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    longing: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    sad: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    surprised: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    thirst: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    thoughtful: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    serious: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
    scared: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5), 
})   

const LeapForm = ({userId, evaluationId}: FillEvaluationForm) => {
    const form = useForm<z.infer<typeof LeapFormSchema>>({
        resolver: zodResolver(LeapFormSchema),
        defaultValues: {
            admiration: -1,
            relieved: -1,
            tired: -1,
            happy: -1,
            accept: -1,
            heat: -1,
            satisfied: -1,
            jealous: -1,
            attracted: -1,
            calm: -1,
            funny: -1,
            desire: -1,
            careful: -1,
            strange: -1,
            hopeful: -1,
            fall_in_love: -1,
            conformed: -1,
            hungry: -1,
            guilty: -1,
            cold: -1,
            despise: -1,
            take_pity_on: -1,
            disgusting: -1,
            need: -1,
            duty: -1,
            envy: -1,
            humiliated: -1,
            interested: -1,
            fear: -1,
            proud: -1,
            shame: -1,
            angry: -1,
            sleepy: -1,
            longing: -1,
            sad: -1,
            surprised: -1,
            thirst: -1,
            thoughtful: -1,
            serious: -1,
            scared: -1,
        }
    });

    const { push } = useRouter();
    const { toast } = useToast();

    const onSubmit = async (values: z.infer<typeof LeapFormSchema>) => {
        saveAnswer(values, evaluationId, userId).then(() => {
            toast({
                title: "Socilitação aprovada",
                description: "Avaliação preenchida e salva",
            });
            push('/user/evaluations');
        });      
    }

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        LeapQuestions.forEach((questions) => (randomizeArray(questions)))
        console.log(LeapQuestions[0])
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
                
                <h1 className="font-bold text-4xl self-center"> Leap </h1>
                <h2 className="text-md self-center"> Nesta página você encontrará uma lista com frases sobre você e sobre o que está sentindo ou pensando neste momento. Sua tarefa é indicar a intensidade de sentimento de 1 a 5 para cada uma dessas frases, sendo a 1 (um) a mais fraca e a 5 (cinco) a mais forte. Não existe resposta certa ou errada. Sua primeira reação ao ler a frase é a melhor. Você deve marcar a intensidade que você está sentindo no momento do preenchimento da lista. Clique no botão abaixo para ver exemplos de preenchimento: </h2>
                <div className="flex flex-row justify-around">
                    <Button className="text-lg basis-1/3" type="button" size="lg">Exemplos</Button>
                </div>
                <Separator className="my-4"/>   
                <h2 className="text-md self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>

                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)}>
                            {
                                LeapQuestions[activeStep].map((question, index) => (
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
                                    LeapQuestions[activeStep].map((question, index) => (form.setValue(question.field, -1)));
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>Limpar</Button>

                                { 
                                    (activeStep != steps.length - 1) ?
                                    <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                        const values = form.getValues(LeapQuestions[activeStep].map((question, index) => (question.field)));
                                        const hasNull = Object.values(values).some((value) => value === -1);
                                        
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

export default LeapForm