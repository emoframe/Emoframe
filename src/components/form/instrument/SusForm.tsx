'use client';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../ui/form';
import { z } from "zod";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { saveAnswer } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { FillEvaluationForm, RadioItem, susQuestions } from '@/types/forms';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const DefaultProps: RadioItem[] = [
    { value: '5', label: 'scaleOption5Label' },
    { value: '4', label: 'scaleOption4Label' },
    { value: '3', label: 'scaleOption3Label' },
    { value: '2', label: 'scaleOption2Label' },
    { value: '1', label: 'scaleOption1Label' },
]

const exampleQuestions = [
    {
        label: 'exampleQuestionsLabel_1',
        selectedValue: '5',
        description: 'exampleQuestionsDescription_1',
    },
    {
        label: 'exampleQuestionsLabel_3',
        selectedValue: '3',
        description: 'exampleQuestionsDescription_2',
    },
    {
        label: 'exampleQuestionsLabel_3',
        selectedValue: '1',
        description: 'exampleQuestionsDescription_3',
    },
];

const SusFormSchema = z.object(
    Object.fromEntries(
        susQuestions.map(item => [
            item.field,
            z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {
                errorMap: (issue, ctx) => ({ message: "Escolha uma opção" })
            })
        ])
    )
);

const SusForm = (params: FillEvaluationForm & { identification: string }) => {
    const FormSchema = !("isViewable" in params) ? SusFormSchema : z.object({});
    const form = useForm<z.infer<typeof SusFormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            use_frequency: '',
            use_complex: '',
            use_easy: '',
            need_help: '',
            function_integration: '',
            inconsistency: '',
            learning_curve: '',
            jumbled: '',
            confidence: '',
            learn_system: '',
        },
    });

    const { push } = useRouter();
    const { toast } = useToast();
    const { t } = useTranslation('specialist_services_instruments_sus');
    const [isExampleOpen, setIsExampleOpen] = useState(false);
    const onSubmit = async (values: z.infer<typeof SusFormSchema>) => {
        if (!("isViewable" in params)) {
            saveAnswer(values, params.evaluationId, params.userId).then(() => {
                toast({
                    title: t("submitTitle"),
                    description: t("submitMessage"),
                });
                push('/user/evaluations');
            });
        }
    };

    return (
        <React.Suspense fallback={<Progress />}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="flex flex-col flex-wrap justify-center gap-6">
                        <h1 className="font-bold text-4xl self-center">SUS - {params.identification || t('identificationExample')}</h1>

                        <div className="flex flex-col justify-center items-center gap-4">
                            <h2 className="text-md self-center"> {t('examplesButtonDescription')} </h2>
                            <Button className="text-lg lg:min-w-96" type="button" onClick={() => setIsExampleOpen(!isExampleOpen)}>{t('examplesButtonLabel')}</Button>
                        </div>
                        {isExampleOpen && exampleQuestions.map(question => (<>
                            <Separator />   
                            <div className="space-y-5 content-center">
                                <p className="text-xl mb-8"><b>{t(question.label)}</b></p>
                                <RadioGroup
                                defaultValue={question.selectedValue}
                                value={question.selectedValue}
                                className="flex flex-row space-x-5 justify-between">
                                    {DefaultProps.map((defaultProp, index) => (
                                        <div className="flex flex-col items-center space-y-2" key={index}>
                                            <div>
                                                <RadioGroupItem value={defaultProp.value}/>
                                            </div>
                                            <div className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal">
                                                {t(defaultProp.label)}
                                            </div>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <h2 className="text-md self-center">{t(question.description)}</h2>
                            </div>
                        </>))}

                        <Separator />

                        <h2 className="text-md self-center"> {t('questionnaireAnswersDescription')} </h2>
                        {
                            susQuestions.map((question, index) => (
                                <>
                                    <FormField
                                        key={index}
                                        control={form.control}
                                        name={question.field}
                                        render={({ field }) => (
                                            <FormItem className="content-center">
                                                <p className="text-xl mb-8"><b>{t(question.label)}</b></p>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        value={field.value}
                                                        className="flex flex-row space-x-5 justify-between">
                                                        {
                                                            DefaultProps.map((option, index) => (
                                                                <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                                    <FormControl>
                                                                        <RadioGroupItem value={option.value} />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {t(option.label)}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            ))
                                                        }
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Separator />
                                </>
                            ))
                        }
                    </div>

                    <div className="flex flex-row justify-around my-8">
                        <Button className="basis-1/8 text-lg" type="reset" size="lg" onClick={() => { form.reset() }}>
                            {t('resetButtonLabel')}
                        </Button>
                        <Button className='basis-1/8 text-lg' type='submit' size="lg">
                            {t('finishButtonLabel')}
                        </Button>
                    </div>
                </form>
            </Form>
        </React.Suspense>
    )
}

export default SusForm