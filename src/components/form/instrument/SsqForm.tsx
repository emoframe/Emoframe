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

import { FillEvaluationForm, Ssq } from '@/types/forms';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const steps: StepConfig[] = [
    { label: 'Sintomas (1 a 6)' },
    { label: 'Sintomas (7 a 11)' },
    { label: 'Sintomas (12 a 16)' },
];

// Escala Likert de 0 a 3 (Esquerda para Direita)
const SsqScaleProps = [
    { value: '0', label: 'scaleOption0Label' }, // Ausente (Esquerda)
    { value: '1', label: 'scaleOption1Label' }, // Leve
    { value: '2', label: 'scaleOption2Label' }, // Moderado
    { value: '3', label: 'scaleOption3Label' }, // Grave (Direita)
];

const ssqQuestionPages = [
    // Parte 1
    [
        { field: 'general_discomfort', label: 'generalDiscomfortLabel' },
        { field: 'fatigue', label: 'fatigueLabel' },
        { field: 'headache', label: 'headacheLabel' },
        { field: 'eyestrain', label: 'eyestrainLabel' },
        { field: 'difficulty_focusing', label: 'difficultyFocusingLabel' },
        { field: 'salivation_increase', label: 'salivationIncreaseLabel' },
    ],
    // Parte 2
    [
        { field: 'sweating', label: 'sweatingLabel' },
        { field: 'nausea', label: 'nauseaLabel' },
        { field: 'difficulty_concentrating', label: 'difficultyConcentratingLabel' },
        { field: 'attention_check_ssq', label: 'attentionCheckSsqLabel' }, // Pergunta de Atenção
        { field: 'fullness_of_head', label: 'fullnessOfHeadLabel' },
        { field: 'blurred_vision', label: 'blurredVisionLabel' },
    ],
    // Parte 3
    [
        { field: 'dizziness_eyes_open', label: 'dizzinessEyesOpenLabel' },
        { field: 'dizziness_eyes_closed', label: 'dizzinessEyesClosedLabel' },
        { field: 'vertigo', label: 'vertigoLabel' },
        { field: 'stomach_awareness', label: 'stomachAwarenessLabel' },
        { field: 'burping', label: 'burpingLabel' },
        { field: 'other', label: 'otherLabel' },
    ],
] as const;

const flatSsqQuestions = ssqQuestionPages.flat();

const SsqFormSchema = z.object(
    Object.fromEntries(
        flatSsqQuestions.map(item => [
            item.field,
            z.coerce.number({ invalid_type_error: "Escolha uma opção" })
              .min(0, "A resposta mínima é 0 (Ausente)")
              .max(3, "A resposta máxima é 3 (Grave)")
        ])
    )
);

type SubmitModeProps = FillEvaluationForm & { identification: string };
type ViewModeProps = { isViewable: true; identification?: string };
type SsqFormProps = SubmitModeProps | ViewModeProps;

const SsqForm = (params: SsqFormProps) => {
    const FormSchema = !("isViewable" in params) ? SsqFormSchema : z.object({});
    
    // ATENÇÃO: Iniciamos com -1 pois 0 é uma resposta válida ("Ausente")
    const defaultValues = Object.fromEntries(
        flatSsqQuestions.map(item => [item.field, -1])
    );

    const form = useForm<z.infer<typeof SsqFormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    });

    const { push } = useRouter();
    const { toast } = useToast();
    const { t } = useTranslation('specialist_services_instruments_ssq');

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    });

    const onSubmit = async (values: z.infer<typeof SsqFormSchema>) => {
        if (!("isViewable" in params)) {
            
            if (values.attention_check_ssq !== 1) {
                toast({
                    title: "Aviso de Qualidade",
                    description: "Parece que você não leu todas as questões atentamente. Sua resposta será sinalizada.",
                    variant: "destructive",
                });
            }

            const payload = values as unknown as Ssq;
            
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
                <h1 className="font-bold text-4xl self-center">SSQ - {params.identification || t('identificationExample')}</h1>
                <Separator />
                <h2 className="text-md self-center text-center"> {t('questionnaireAnswersDescription')} </h2>
                
                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                            
                            {ssqQuestionPages[activeStep].map((question, index) => (
                                <FormField
                                    key={"formField" + index}
                                    control={form.control}
                                    name={question.field}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-center content-center gap-5 w-full">
                                            <div className='bg-primary flex justify-end w-full md:w-11/12 lg:w-10/12 xl:w-8/12 2xl:w-7/12 gap-4 rounded-l-lg'>
                                                <div className='bg-white px-4 md:px-8 pt-8 pb-10 w-[99%] flex flex-col'>
                                                    <p className="text-lg md:text-xl pb-8 md:pb-12 break-words">
                                                        <b>{t(question.label)}</b>
                                                    </p>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value !== -1 ? field.value?.toString() : undefined}
                                                            value={field.value !== -1 ? field.value?.toString() : undefined}
                                                            className="flex flex-row flex-wrap gap-y-6 gap-x-2 sm:gap-x-4 justify-between w-full">
                                                            
                                                            {SsqScaleProps.map((scaleProp, i) => (
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
                                    ssqQuestionPages[activeStep].forEach((question) => {
                                        form.setValue(question.field as any, -1);
                                    });
                                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                }}>
                                    {t('resetButtonLabel')}
                                </Button>

                                {
                                    (activeStep < steps.length - 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const stepFields = ssqQuestionPages[activeStep].map(q => q.field);
                                            const values = form.getValues(stepFields as any);
                                            
                                            const hasNull = !("isViewable" in params) 
                                                ? Object.values(values).some((value) => value === -1 || value === undefined) 
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

export default SsqForm;