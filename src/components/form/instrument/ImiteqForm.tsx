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
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { saveAnswer } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { zodResolver } from '@hookform/resolvers/zod';
import { useStepper } from "@/components/ui/hooks/use-stepper";
import { Steps, Step, StepConfig } from '@/components/ui/stepper';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { FillEvaluationForm, Imiteq } from '@/types/forms';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const steps: StepConfig[] = [
    { label: 'Interesse e Diversão' },
    { label: 'Competência Percebida' },
    { label: 'Escolha Percebida' },
    { label: 'Pressão e Tensão' },
];

const ImiteqScaleProps = [
    { value: '1', label: 'scaleOption1Label' },
    { value: '2', label: 'scaleOption2Label' },
    { value: '3', label: 'scaleOption3Label' },
    { value: '4', label: 'scaleOption4Label' },
    { value: '5', label: 'scaleOption5Label' },
    { value: '6', label: 'scaleOption6Label' },
    { value: '7', label: 'scaleOption7Label' },
];

const imiteqQuestionPages = [
    [
        { field: 'int_enjoyed_task', label: 'intEnjoyedTaskLabel' },
        { field: 'int_interesting', label: 'intInterestingLabel' },
        { field: 'int_fun', label: 'intFunLabel' },
        { field: 'int_enjoyed_very_much', label: 'intEnjoyedVeryMuchLabel' },
        { field: 'int_boring_rev', label: 'intBoringRevLabel' }, // (R)
        { field: 'int_enjoyable', label: 'intEnjoyableLabel' },
    ],
    [
        { field: 'com_pretty_good', label: 'comPrettyGoodLabel' },
        { field: 'com_did_well_compared', label: 'comDidWellComparedLabel' },
        { field: 'com_satisfied_performance', label: 'comSatisfiedPerformanceLabel' },
        { field: 'com_pretty_skilled', label: 'comPrettySkilledLabel' },
        { field: 'com_pretty_competent', label: 'comPrettyCompetentLabel' },
    ],
    [
        { field: 'cho_my_choice', label: 'choMyChoiceLabel' },
        { field: 'cho_no_choice_rev', label: 'choNoChoiceRevLabel' }, // (R)
        { field: 'cho_did_what_wanted', label: 'choDidWhatWantedLabel' },
        { field: 'attention_check_imiteq', label: 'attentionCheckImiteqLabel' }, // Pergunta Falsa
        { field: 'cho_had_to_do_rev', label: 'choHadToDoRevLabel' }, // (R)
        { field: 'cho_because_no_choice_rev', label: 'choBecauseNoChoiceRevLabel' }, // (R)
    ],
    [
        { field: 'pre_not_nervous_rev', label: 'preNotNervousRevLabel' }, // (R)
        { field: 'pre_tense', label: 'preTenseLabel' },
        { field: 'pre_relaxed_rev', label: 'preRelaxedRevLabel' }, // (R)
        { field: 'pre_anxious', label: 'preAnxiousLabel' },
        { field: 'pre_pressured', label: 'prePressuredLabel' },
    ],
] as const;

const flatImiteqQuestions = imiteqQuestionPages.flat();

const ImiteqFormSchema = z.object(
    Object.fromEntries(
        flatImiteqQuestions.map(item => [
            item.field,
            z.coerce.number({ invalid_type_error: "Escolha uma opção" })
              .min(1, "A resposta mínima é 1")
              .max(7, "A resposta máxima é 7")
        ])
    )
);

type SubmitModeProps = FillEvaluationForm & { identification: string; taskName?: string };
type ViewModeProps = { isViewable: true; identification?: string; taskName?: string };
type ImiteqFormProps = SubmitModeProps | ViewModeProps;

const ImiteqForm = (params: ImiteqFormProps) => {
    const FormSchema = !("isViewable" in params) ? ImiteqFormSchema : z.object({});
    
    const taskName = params.taskName || "realizar a tarefa"; // Valor dinâmico da "Tarefa X"

    const defaultValues = Object.fromEntries(
        flatImiteqQuestions.map(item => [item.field, 0])
    );

    const form = useForm<z.infer<typeof ImiteqFormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    });

    const { push } = useRouter();
    const { toast } = useToast();
    const { t } = useTranslation('specialist_services_instruments_imiteq');

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    });

    const onSubmit = async (values: z.infer<typeof ImiteqFormSchema>) => {
        if (!("isViewable" in params)) {
            
            if (values.attention_check_imiteq !== 4) {
                toast({
                    title: "Aviso de Qualidade",
                    description: "Parece que você não leu todas as questões atentamente. Sua resposta será sinalizada.",
                    variant: "destructive",
                });
            }

            const payload = values as unknown as Imiteq;
            
            saveAnswer(payload, params.evaluationId, params.userId).then(() => {
                toast({
                    title: t("submitTitle"),
                    description: t("submitMessage"),
                });
                push('/user/evaluations');
            }).catch(() => {
                toast({
                    title: "Erro",
                    description: "Ocorreu um erro ao salvar suas respostas.",
                    variant: "destructive",
                });
            });
        }
    };

    return (
        <div>
            <Steps activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step 
                        index={index} 
                        key={index} 
                        additionalClassName={{ label: "text-md" }} 
                        {...{ label: step.label }} 
                    />
                ))}
            </Steps>

            <div className="flex flex-col flex-wrap justify-center gap-6 pt-8">
                <h1 className="font-bold text-4xl self-center">IMI-TEQ - {params.identification || t('identificationExample')}</h1>
                <Separator />
                <h2 className="text-md self-center text-center"> {t('questionnaireAnswersDescription')} </h2>
                
                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                            
                            {imiteqQuestionPages[activeStep].map((question, index) => (
                                <FormField
                                    key={"formField" + index}
                                    control={form.control}
                                    name={question.field}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-center content-center gap-5 w-full">
                                            <div className='bg-primary flex justify-end w-full md:w-11/12 lg:w-10/12 xl:w-8/12 2xl:w-7/12 gap-4 rounded-l-lg'>
                                                <div className='bg-white px-4 md:px-8 pt-8 pb-10 w-[99%] flex flex-col'>
                                                    <p className="text-lg md:text-xl pb-8 md:pb-12 break-words">
                                                        <b>{t(question.label, { task: taskName })}</b>
                                                    </p>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value?.toString()}
                                                            value={field.value?.toString()}
                                                            className="flex flex-row flex-wrap gap-y-6 gap-x-2 sm:gap-x-4 justify-between w-full">
                                                            
                                                            {ImiteqScaleProps.map((scaleProp, i) => (
                                                                <FormItem className="flex flex-col-reverse items-center justify-between gap-4" key={i}>
                                                                    <FormControl>
                                                                        <RadioGroupItem value={scaleProp.value} />
                                                                    </FormControl>
                                                                    <FormLabel className="font-medium text-[#323232] text-xs sm:text-sm md:text-base text-center break-words max-w-[60px] md:max-w-[90px] whitespace-normal h-10 flex items-start justify-center cursor-pointer">
                                                                        {t(scaleProp.label)}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            ))}

                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            ))}

                            <div key="buttons" className="flex flex-row justify-around mt-8">
                                {
                                    (activeStep !== 0) &&
                                    <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                        prevStep();
                                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                    }}>
                                        {t('previousButtonLabel')}
                                    </Button>
                                }

                                <Button className="basis-1/8 text-lg" type='button' size="lg" onClick={() => {
                                    imiteqQuestionPages[activeStep].forEach((question) => {
                                        form.setValue(question.field as any, 0);
                                    });
                                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                }}>
                                    {t('resetButtonLabel')}
                                </Button>

                                {
                                    (activeStep < steps.length - 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const stepFields = imiteqQuestionPages[activeStep].map(q => q.field);
                                            const values = form.getValues(stepFields as any);
                                            
                                            const hasNull = !("isViewable" in params) 
                                                ? Object.values(values).some((value) => value === "" || value === 0 || value === undefined) 
                                                : false;

                                            if (hasNull) {
                                                toast({
                                                    title: "Aviso",
                                                    description: "Preencha todos os campos desta página para continuar!",
                                                });
                                            } else {
                                                nextStep();
                                                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                            }
                                        }}>
                                            {t('nextButtonLabel')}
                                        </Button>
                                        : 
                                        <Button className="basis-1/8 text-lg" type="submit" size="lg" disabled={form.formState.isSubmitting}>
                                            {t('finishButtonLabel')}
                                        </Button>
                                }
                            </div>
                        </form>
                    </Form>
                </React.Suspense>
            </div>
        </div>
    )
}

export default ImiteqForm;