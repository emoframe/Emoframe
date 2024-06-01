'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const PanasForm = (params: FillEvaluationForm) => {
    const { t } = useTranslation();
    const DefaultProps: RadioItem[] = [
        {value: '1', label: t('1 (Nada ou muito ligeiramente)')},
        {value: '2', label: t('2 (Um pouco)')},
        {value: '3', label: t('3 (Moderadamente)')},
        {value: '4', label: t('4 (Bastante)')},
        {value: '5', label: t('5 (Extremamente)')},
    ];

    const steps: StepConfig[] = [
        {label: t('Passo 1')},
        {label: t('Passo 2')},
    ];

    interface PanasQuestionsProps {
        field: "repulsion" | "tormented" | "scared" | "hearty" | 
        "excited" | "guilty" | "enthusiastic" | "pleasantly_surprised" | 
        "disturbed" | "trembling" | "active" | "proud" | "inspired" | "nervous" | 
        "angry" | "determined" | "charmed" | "remorse" | "frightened" | "interested",
        question: string,
    }

    const PanasQuestions: PanasQuestionsProps[][] = [
        [
            {field: "repulsion", question: t('Estou me sentindo REPULSO(A).')},
            {field: "tormented", question: t('Estou me sentindo ATORMENTADO(A).')},
            {field: "scared", question: t('Estou me sentindo ASSUSTADO(A).')},
            {field: "hearty", question: t('Estou me sentindo CALOROSO(A).')},
            {field: "excited", question: t('Estou me sentindo EXCITADO(A).')},
            {field: "guilty", question: t('Estou me sentindo CULPADO(A).')},
            {field: "enthusiastic", question: t('Estou me sentindo ENTUSIASMADO(A).')},
            {field: "pleasantly_surprised", question: t('Estou me sentindo AGRADAVELMENTE SURPREENDIDO(A).')},
            {field: "disturbed", question: t('Estou me sentindo PERTURBADO(A).')},
            {field: "trembling", question: t('Estou me sentindo TRÊMULO(A).')},
        ],
        [
            {field: "active", question: t('Estou me sentindo ATIVO(A).')},
            {field: "proud", question: t('Estou me sentindo ORGULHOSO(A).')},
            {field: "inspired", question: t('Estou me sentindo INSPIRADO(A).')},
            {field: "nervous", question: t('Estou me sentindo NERVOSO(A).')},
            {field: "angry", question: t('Estou me sentindo IRRITADO(A).')},
            {field: "determined", question: t('Estou me sentindo DETERMINADO(A).')},
            {field: "charmed", question: t('Estou me sentindo ENCANTADO(A).')},
            {field: "remorse", question: t('Estou sentindo REMORSO.')},
            {field: "frightened", question: t('Estou me sentindo AMEDRONTADO(A).')},
            {field: "interested", question: t('Estou me sentindo INTERESSADO(A).')},
        ]
    ];

    const PanasFormSchema = z.object({
        repulsion: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        tormented: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        scared: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        hearty: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        excited: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        guilty: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        enthusiastic: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        pleasantly_surprised: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        disturbed: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        trembling: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        active: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        proud: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        inspired: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        nervous: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        angry: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        determined: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        charmed: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        remorse: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        frightened: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
        interested: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t('Escolha uma opção')})}),
    })

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
        if(!("isViewable" in params)) {
            saveAnswer(values, params.evaluationId, params.userId).then(() => {
                toast({
                    title: t('Solicitação aprovada'),
                    description: t('Avaliação preenchida e salva'),
                });
                push('/user/evaluations');
            });  
        }    
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
                
                <h1 className="font-bold text-4xl self-center"> {t('PANAS')} </h1>
                <h2 className="text-md self-center"> {t('Esta escala consiste num conjunto de palavras que descrevem diferentes sentimentos e emoções. Leia cada palavra e marque a resposta adequada a palavra. Veja a escala e exemplos de preenchimento abaixo:')} </h2>
                <div className="flex flex-row justify-around">
                    <Button className="text-lg basis-1/3" type="button" size="lg">{t('Exemplos')}</Button>
                </div>
                <Separator className="my-4"/>   
                <h2 className="text-md self-center"> {t('Indique em que medida está sentindo cada uma das emoções AGORA:')} </h2>

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
                                    }}>{t('Anterior')}</Button>
                                }
                                
                                <Button className="basis-1/8 text-lg" type='button' size="lg" onClick={() => {
                                    PanasQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>{t('Limpar')}</Button>

                                { 
                                    (activeStep != 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const values = form.getValues(PanasQuestions[activeStep].map((question, index) => (question.field)));
                                            const hasNull = !("isViewable" in params) ? Object.values(values).some((value) => value === "") : false;

                                            if (hasNull) {
                                                toast({
                                                    title: t('Solicitação negada'),
                                                    description: t('Preencha todos os campos!'),
                                                });
                                            }
                                            else{
                                                nextStep();
                                                window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                            }
                                        }}>{t('Próximo')}</Button>
                                    : <Button className="basis-1/8 text-lg" type="submit" size="lg">{t('Enviar')}</Button>
                                }
                            </div>
                        </form>
                    </Form>
                </React.Suspense>
            </div>
       </div>
    );
}

export default PanasForm;
