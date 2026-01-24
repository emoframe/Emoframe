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
import { chunk, randomizeArray } from '@/lib/utils';
import { FillEvaluationForm, panasQuestions } from '@/types/forms';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

interface RadioItem {
    value: string;
    label: string;
}

const DefaultProps: RadioItem[] = [
    { value: '1', label: 'scaleOption1Label' },
    { value: '2', label: 'scaleOption2Label' },
    { value: '3', label: 'scaleOption3Label' },
    { value: '4', label: 'scaleOption4Label' },
    { value: '5', label: 'scaleOption5Label' },
];

const exampleQuestions = [
    {
        label: 'exampleQuestionsLabel_1',
        selectedValue: '1',
        description: 'exampleQuestionsDescription_1',
    },
    {
        label: 'exampleQuestionsLabel_2',
        selectedValue: '3',
        description: 'exampleQuestionsDescription_2',
    },
    {
        label: 'exampleQuestionsLabel_3',
        selectedValue: '5',
        description: 'exampleQuestionsDescription_3',
    },
];

const PanasFormSchema = z.object(
    Object.fromEntries(
        panasQuestions.map(item => [
            item.field,
            z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {
                errorMap: (issue, ctx) => ({ message: "Escolha uma opção" })
            })
        ])
    )
);

// Dividir panasQuestions em 2 partes
const panasQuestionsChunks = chunk(panasQuestions, Math.ceil(panasQuestions.length / 2));

// Gerar steps com 2 partes
const steps: StepConfig[] = panasQuestionsChunks.map((_, index) => ({ label: `step${index + 1}Label` }));

const PanasForm = (params: FillEvaluationForm) => {
    const FormSchema = !("isViewable" in params) ? PanasFormSchema : z.object({});
    const form = useForm<z.infer<typeof PanasFormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            interested: '',
            distressed: '',
            excited: '',
            upset: '',
            strong: '',
            guilty: '',
            scared: '',
            hostile: '',
            enthusiastic: '',
            proud: '',
            irritable: '',
            alert: '',
            ashamed: '',
            inspired: '',
            nervous: '',
            determined: '',
            attentive: '',
            jittery: '',
            active: '',
            afraid: ''
        }
    });

    const { push } = useRouter();
    const { toast } = useToast();
    const { t } = useTranslation('specialist_services_instruments_panas');
    const onSubmit = async (values: z.infer<typeof PanasFormSchema>) => {
        if (!("isViewable" in params)) {
            saveAnswer(values, params.evaluationId, params.userId).then(() => {
                toast({
                    title: t('submitTitle'),
                    description: t('submitMessage'),
                });
                push('/user/evaluations');
            });
        }
    }

    const [isReady, setIsReady] = useState(false);
    const [isExampleOpen, setIsExampleOpen] = useState(false);

    useEffect(() => {
        panasQuestionsChunks.forEach((questions) => (randomizeArray(questions)))
        setIsReady(true);
    }, []);

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    })

    if (!isReady) return null;
    return (
        <div>
            <Steps activeStep={activeStep}>
                {steps.map((step, index) => (<Step index={index} key={index} additionalClassName={{ label: "text-md" }} {...{ label: t(`${step.label}`) }} />))}
            </Steps>

            <div className="flex flex-col flex-wrap justify-center gap-8">

                <h1 className="font-bold text-4xl self-center"> PANAS </h1>
                <h2 className="text-md self-center"> {t('questionnaireDescription')} </h2>
                <div className="flex flex-row justify-around">
                    <Button className="text-lg basis-1/3" type="button" size="lg" onClick={() => setIsExampleOpen(!isExampleOpen)}>{t('examplesButtonLabel')}</Button>
                </div>
                {isExampleOpen && exampleQuestions.map(question => (<>
                    <Separator className="my-4" />
                    <div className="space-x-5 space-y-5 content-center">
                        <p className="text-xl"><b>{t(question.label)}</b></p>
                        <RadioGroup
                            defaultValue={question.selectedValue}
                            value={question.selectedValue}
                            className="flex flex-row space-x-5 justify-between">
                            {DefaultProps.map((defaultProp, index) => (
                                <div className="flex flex-col items-center space-y-2" key={index}>
                                    <div>
                                        <RadioGroupItem value={defaultProp.value} />
                                    </div>
                                    <div className="font-normal text-md">
                                        {t(defaultProp.label)}
                                    </div>
                                </div>
                            ))}
                        </RadioGroup>
                        <h2 className="text-md self-center">{t(question.description)}</h2>
                    </div>
                </>))}
                <Separator className="my-4" />
                <h2 className="text-md self-center"> {t('questionnaireAnswersDescription')} </h2>

                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                            {
                                panasQuestionsChunks[activeStep].map((question, index) => (
                                    <>
                                        <FormField key={"formField" + index}
                                            control={form.control}
                                            name={question.field}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col items-center content-center gap-5">
                                                    <div className='bg-primary flex justify-end w-1/2 gap-4 rounded-l-lg'>
                                                        <div className='bg-white px-4 pt-8 pb-10 w-[98%] flex flex-col'>
                                                            <p className="text-xl pb-12"><b>{t(question.question)}</b></p>
                                                            <FormControl>
                                                                <RadioGroup
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                    value={field.value}
                                                                    className="flex flex-row space-x-5 justify-between">
                                                                    {DefaultProps.map((defaultProp, index) => (
                                                                        <FormItem className="flex flex-col-reverse items-center justify-between gap-6" key={index}>
                                                                            <FormControl>
                                                                                <RadioGroupItem value={defaultProp.value} />
                                                                            </FormControl>
                                                                            <FormLabel className="font-medium text-[#323232] text-lg text-center whitespace-pre-line">
                                                                                {t(defaultProp.label)}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    ))}
                                                                </RadioGroup>
                                                            </FormControl>
                                                            <FormMessage />

                                                        </div>
                                                    </div>
                                                </FormItem>
                                            )} />
                                    </>
                                ))
                            }
                            <div key="buttons" className="flex flex-row justify-around mt-8">
                                {
                                    (activeStep != 0) &&
                                    <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                        prevStep();
                                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                    }}>{t('previousButtonLabel')}</Button>
                                }

                                <Button className="basis-1/8 text-lg" type='button' size="lg" onClick={() => {
                                    panasQuestionsChunks[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                }}>{t('resetButtonLabel')}</Button>

                                {
                                    (activeStep != 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const values = form.getValues(panasQuestionsChunks[activeStep].map((question, index) => (question.field)));
                                            const hasNull = !("isViewable" in params) ? Object.values(values).some((value) => value === "") : false;

                                            if (hasNull) {
                                                toast({
                                                    title: "Socilitação negada",
                                                    description: "Preencha todos os campos!",
                                                });
                                            }
                                            else {
                                                nextStep();
                                                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                            }
                                        }}>{t('nextButtonLabel')}</Button>
                                        : <Button className="basis-1/8 text-lg" type="submit" size="lg">{t('finishButtonLabel')}</Button>
                                }
                            </div>
                        </form>
                    </Form>
                </React.Suspense>
            </div>
        </div>
    );
}

export default PanasForm