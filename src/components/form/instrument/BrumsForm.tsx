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
import { useTranslation } from 'react-i18next';

const steps: StepConfig[] = [
    { label: 'step1Label' },
    { label: 'step2Label' },
    { label: 'step3Label' },
]

const DefaultProps: RadioItem[] = [
    { value: '1', label: 'scaleOption1Label' },
    { value: '2', label: 'scaleOption2Label' },
    { value: '3', label: 'scaleOption3Label' },
    { value: '4', label: 'scaleOption4Label' },
    { value: '5', label: 'scaleOption5Label' },
]

interface BrumsQuestionsProps {
    field: 'cheered_up' | 'irritated' | 'depressed' | 'terrified' | 'crestfallen' | 'broken_down' | 'confused' | 'exhausted' | 'anxious' | 'unhappy' | 'huffy' | 'worried' | 'sad' | 'sleepy' | 'insecure' | 'willing' | 'tense' | 'disoriented' | 'grumpy' | 'undecided' | 'tired' | 'energy' | 'angry' | 'alert'
    question: string,
}

const BrumsQuestions: BrumsQuestionsProps[][] = [
    [
        { field: 'cheered_up', question: 'brumsOptioncheerfulLabel' },
        { field: 'irritated', question: 'brumsOptionirritatedLabel' },
        { field: 'depressed', question: 'brumsOptiondepressedLabel' },
        { field: 'terrified', question: 'brumsOptionterrifiedLabel' },
        { field: 'crestfallen', question: 'brumsOptioncrestfallenLabel' },
        { field: 'broken_down', question: 'brumsOptionbroken_downLabel' },
        { field: 'confused', question: 'brumsOptionconfusedLabel' },
        { field: 'exhausted', question: 'brumsOptionexhaustedLabel' },
    ],
    [
        { field: 'anxious', question: 'brumsOptionanxiousLabel' },
        { field: 'unhappy', question: 'brumsOptionunhappyLabel' },
        { field: 'huffy', question: 'brumsOptionhuffyLabel' },
        { field: 'worried', question: 'brumsOptionworriedLabel' },
        { field: 'sad', question: 'brumsOptionsadLabel' },
        { field: 'sleepy', question: 'brumsOptionsleepyLabel' },
        { field: 'insecure', question: 'brumsOptioninsecureLabel' },
    ],
    [
        { field: 'willing', question: 'brumsOptionwillingLabel' },
        { field: 'tense', question: 'brumsOptiontenseLabel' },
        { field: 'disoriented', question: 'brumsOptiondisorientedLabel' },
        { field: 'grumpy', question: 'brumsOptiongrumpyLabel' },
        { field: 'undecided', question: 'brumsOptionundecidedLabel' },
        { field: 'tired', question: 'brumsOptiontiredLabel' },
        { field: 'energy', question: 'brumsOptionenergyLabel' },
        { field: 'angry', question: 'brumsOptionangryLabel' },
        { field: 'alert', question: 'brumsOptionalertLabel' },
    ]
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

const BrumsFormSchema = z.object({
    cheered_up: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    irritated: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    depressed: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    terrified: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    crestfallen: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    broken_down: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    confused: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    exhausted: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    anxious: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    unhappy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    huffy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    worried: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    sad: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    sleepy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    insecure: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    willing: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    tense: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    disoriented: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    grumpy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    undecided: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    tired: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    energy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    angry: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
    alert: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }),
})

const BrumsForm = (params: FillEvaluationForm) => {
    const FormSchema = !("isViewable" in params) ? BrumsFormSchema : z.object({});
    const form = useForm<z.infer<typeof BrumsFormSchema>>({
        resolver: zodResolver(FormSchema),
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
    const { toast } = useToast();
    const { t } = useTranslation('specialist_services_instruments_brums');
    const onSubmit = async (values: z.infer<typeof BrumsFormSchema>) => {
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
        BrumsQuestions.forEach((questions) => (randomizeArray(questions)));
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

            <div className="flex flex-col flex-wrap justify-center gap-8 pt-8">

                <h1 className="font-bold text-4xl self-center"> BRUMS </h1>
                <h2 className="text-md self-center"> {t('questionnaireDescription')} </h2>
                <h2 className="text-md self-center">  {t('examplesButtonDescription')} </h2>

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
                <h2 className="text-md self-center"> {t('answersInstruction')} </h2>

                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                            {
                                BrumsQuestions[activeStep].map((question, index) => (
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
                                    BrumsQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                }}>{t('resetButtonLabel')}</Button>

                                {
                                    (activeStep < 2) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const values = form.getValues(BrumsQuestions[activeStep].map((question, index) => (question.field)));
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

export default BrumsForm