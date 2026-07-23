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

import { FillEvaluationForm, Tuq } from '@/types/forms';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const steps: StepConfig[] = [
    { label: 'Parte 1 (1 a 6)' },
    { label: 'Parte 2 (7 a 11)' },
    { label: 'Parte 3 (12 a 16)' },
    { label: 'Parte 4 (17 a 21)' },
];

const TuqScaleProps = [
    { value: '0', label: 'scaleOption0Label' },
    { value: '1', label: 'scaleOption1Label' },
    { value: '2', label: 'scaleOption2Label' },
    { value: '3', label: 'scaleOption3Label' },
    { value: '4', label: 'scaleOption4Label' },
    { value: '5', label: 'scaleOption5Label' },
    { value: '6', label: 'scaleOption6Label' },
    { value: '7', label: 'scaleOption7Label' },
];

const tuqQuestionPages = [
    [
        { field: 'tuq_improves_access', label: 'tuqImprovesAccessLabel' },
        { field: 'tuq_saves_time', label: 'tuqSavesTimeLabel' },
        { field: 'tuq_meets_needs', label: 'tuqMeetsNeedsLabel' },
        { field: 'tuq_simple_to_use', label: 'tuqSimpleToUseLabel' },
        { field: 'tuq_easy_to_learn', label: 'tuqEasyToLearnLabel' },
        { field: 'tuq_return_activities', label: 'tuqReturnActivitiesLabel' },
    ],
    [
        { field: 'tuq_pleasant_interaction', label: 'tuqPleasantInteractionLabel' },
        { field: 'tuq_like_using_system', label: 'tuqLikeUsingSystemLabel' },
        { field: 'tuq_simple_easy_understand', label: 'tuqSimpleEasyUnderstandLabel' },
        { field: 'tuq_does_what_i_want', label: 'tuqDoesWhatIWantLabel' },
        { field: 'attention_check_tuq', label: 'attentionCheckTuqLabel' }, // Controle
        { field: 'tuq_easily_talk_professional', label: 'tuqEasilyTalkProfessionalLabel' },
    ],
    [
        { field: 'tuq_hear_clearly', label: 'tuqHearClearlyLabel' },
        { field: 'tuq_express_effectively', label: 'tuqExpressEffectivelyLabel' },
        { field: 'tuq_see_well_as_person', label: 'tuqSeeWellAsPersonLabel' },
        { field: 'tuq_same_as_in_person', label: 'tuqSameAsInPersonLabel' },
        { field: 'tuq_easy_error_recovery', label: 'tuqEasyErrorRecoveryLabel' },
    ],
    [
        { field: 'tuq_clear_error_messages', label: 'tuqClearErrorMessagesLabel' },
        { field: 'tuq_comfortable_communicating', label: 'tuqComfortableCommunicatingLabel' },
        { field: 'tuq_acceptable_way', label: 'tuqAcceptableWayLabel' },
        { field: 'tuq_would_use_again', label: 'tuqWouldUseAgainLabel' },
        { field: 'tuq_overall_satisfied', label: 'tuqOverallSatisfiedLabel' },
    ],
] as const;

const flatTuqQuestions = tuqQuestionPages.flat();

const TuqFormSchema = z.object(
    Object.fromEntries(
        flatTuqQuestions.map(item => [
            item.field,
            z.coerce.number({ invalid_type_error: "Escolha uma opção" })
              .min(0, "A resposta mínima é 0 (N/A)")
              .max(7, "A resposta máxima é 7")
        ])
    )
);

type SubmitModeProps = FillEvaluationForm & { identification: string };
type ViewModeProps = { isViewable: true; identification?: string };
type TuqFormProps = SubmitModeProps | ViewModeProps;

const TuqForm = (params: TuqFormProps) => {
    const FormSchema = !("isViewable" in params) ? TuqFormSchema : z.object({});
    
    const defaultValues = Object.fromEntries(
        flatTuqQuestions.map(item => [item.field, -1])
    );

    const form = useForm<z.infer<typeof TuqFormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    });

    const { push } = useRouter();
    const { toast } = useToast();
    const { t } = useTranslation('specialist_services_instruments_tuq');

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    });

    const onSubmit = async (values: z.infer<typeof TuqFormSchema>) => {
        if (!("isViewable" in params)) {
            
            // Verifica a questão de atenção (exigimos N/A - valor 0)
            if (values.attention_check_tuq !== 0) {
                toast({
                    title: "Aviso de Qualidade",
                    description: "Detectamos desatenção na questão de controle. Sua resposta será sinalizada.",
                    variant: "destructive",
                });
            }

            const payload = values as unknown as Tuq;
            
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
                <h1 className="font-bold text-4xl self-center">TUQ - {params.identification || t('identificationExample')}</h1>
                <Separator />
                <h2 className="text-md self-center text-center"> {t('questionnaireAnswersDescription')} </h2>
                
                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                            
                            {tuqQuestionPages[activeStep].map((question, index) => (
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
                                                            
                                                            {TuqScaleProps.map((scaleProp, i) => (
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
                                    tuqQuestionPages[activeStep].forEach((question) => {
                                        form.setValue(question.field as any, -1);
                                    });
                                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                }}>
                                    {t('resetButtonLabel')}
                                </Button>

                                {
                                    (activeStep < steps.length - 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const stepFields = tuqQuestionPages[activeStep].map(q => q.field);
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

export default TuqForm;