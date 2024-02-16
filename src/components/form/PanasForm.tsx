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
import { useStepper } from "@/components/ui/hooks/use-stepper";
import { Steps, Step, StepConfig } from '@/components/ui/stepper';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { randomizeArray } from '@/lib/utils';

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

type FieldType = "repulsion" | "tormented" | "scared" | "hearty" | "horny" | "guilty" | "enthusiastic" | "pleasantly_surprised" | "disturbed" | "trembling" | "active" | "proud" | "inspired" | "nervous" | "angry" | "determined" | "charmed" | "remorse" | "frightened" | "interested" 

interface PanasQuestionsProps {
    field: FieldType,
    question: string,
}

const PanasQuestionsFirstPage: PanasQuestionsProps[] = [
    {field: "repulsion", question: "Estou me sentindo REPULSO(A)."},
    {field: "tormented", question: "Estou me sentindo ATORMENTADO(A)."},
    {field: "scared", question: "Estou me sentindo ASSUSTADO(A)."},
    {field: "hearty", question: "Estou me sentindo CALOROSO(A)."},
    {field: "horny", question: "Estou me sentindo EXCITADO(A)."},
    {field: "guilty", question: "Estou me sentindo CULPADO(A)."},
    {field: "enthusiastic", question: "Estou me sentindo ENTUSIASMADO(A)."},
    {field: "pleasantly_surprised", question: "Estou me sentindo AGRADAVELMENTE SURPREENDIDO(A)."},
    {field: "disturbed", question: "Estou me sentindo PERTURBADO(A)."},
    {field: "trembling", question: "Estou me sentindo TRÊMULO(A)."},
]

const PanasQuestionsSecondPage: PanasQuestionsProps[] = [
    {field: "active", question: "Estou me sentindo ATIVO(A)."},
    {field: "proud", question: "Estou me sentindo ORGULHOSO(A)."},
    {field: "inspired", question: "Estou me sentindo INSPIRADO(A)."},
    {field: "nervous", question: "Estou me sentindo NERVOSO(A)."},
    {field: "angry", question: "Estou me sentindo IRRITADO(A)."},
    {field: "determined", question: "Estou me sentindo DETERMINADO(A)."},
    {field: "charmed", question: "Estou me sentindo ENCANTADO(A)."},
    {field: "remorse", question: "Estou sentindo REMORSO."},
    {field: "frightened", question: "Estou me sentindo AMEDRONTADO(A)."},
    {field: "interested", question: "Estou me sentindo INTERESSADO(A)."},
]

const PanasQuestions: PanasQuestionsProps[][] = [
    PanasQuestionsFirstPage,
    PanasQuestionsSecondPage,
]

const PanasFormSchema = z.object({
    repulsion: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    tormented: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    scared: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    hearty: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    horny: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
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

const PanasForm = ({userId}) => {
    const form = useForm<z.infer<typeof PanasFormSchema>>({
        resolver: zodResolver(PanasFormSchema),
        defaultValues: {
            repulsion: '',
            tormented: '',
            scared: '',
            hearty: '',
            horny: '',
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

    const onSubmit = async (values: z.infer<typeof PanasFormSchema>) => {
        createForm(values, userId, "Panas").then(() => {push('/profile')})     
    }

    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        PanasQuestions.forEach((questions) => (randomizeArray(questions)))
        console.log(PanasQuestions[0])
        setIsReady(true);
    }, []);

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    })

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
                            <div className="flex flex-col flex-wrap justify-center gap-8">
                                <h1 className="font-bold text-4xl self-center"> PANAS </h1>
                                <h2 className="text-2xl self-center"> Esta escala consiste num conjunto de palavras que descrevem diferentes sentimentos e emoções. Leia cada palavra e marque a resposta adequada a palavra. Veja a escala e exemplos de preenchimento abaixo: </h2>
                                <div className="flex flex-row justify-around">
                                    <Button className="basis-full" type="button">Exemplos</Button>
                                </div>
                                <div>
                                    <hr className="text-black bg-slate-300 h-0.5"/>
                                </div>
                                <h2 className="text-2xl self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>
                                {PanasQuestions[activeStep].map((question, index) => (
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
                                        PanasQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                    }}>Limpar</Button>
                                    <Button className="basis-1/8 text-lg" type="button" onClick={() => {
                                        const values = form.getValues(PanasQuestions[activeStep].map((question, index) => (question.field)));
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
                            <h1 className="font-bold text-4xl self-center"> PANAS </h1>
                            <h2 className="text-2xl self-center"> Esta escala consiste num conjunto de palavras que descrevem diferentes sentimentos e emoções. Leia cada palavra e marque a resposta adequada a palavra. Veja a escala e exemplos de preenchimento abaixo: </h2>
                            <div className="flex flex-row justify-around">
                                <Button className="basis-full" type="button">Exemplos</Button>
                            </div>
                            <div>
                                <hr className="text-black bg-slate-300 h-0.5"/>
                            </div>
                            <h2 className="text-2xl self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>
                            {PanasQuestions[activeStep].map((question, index) => (
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
                                    PanasQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
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

export default PanasForm