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

import { FillEvaluationForm, Ues } from '@/types/forms';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const steps: StepConfig[] = [
    { label: 'Atenção Focada' },
    { label: 'Usabilidade Percebida' },
    { label: 'Apelo Estético' },
    { label: 'Recompensa' },
];

const UesScaleProps = [
    { value: '1', label: 'scaleOption1Label' },
    { value: '2', label: 'scaleOption2Label' },
    { value: '3', label: 'scaleOption3Label' },
    { value: '4', label: 'scaleOption4Label' },
    { value: '5', label: 'scaleOption5Label' },
];

const uesQuestionPages = [
    [
        { field: 'fa_lost_myself', label: 'faLostMyselfLabel' },
        { field: 'fa_lost_track_time', label: 'faLostTrackTimeLabel' },
        { field: 'fa_blocked_out_things', label: 'faBlockedOutThingsLabel' },
        { field: 'fa_lost_track_world', label: 'faLostTrackWorldLabel' },
        { field: 'fa_time_slipped_away', label: 'faTimeSlippedAwayLabel' },
        { field: 'fa_absorbed', label: 'faAbsorbedLabel' },
        { field: 'fa_let_myself_go', label: 'faLetMyselfGoLabel' },
    ],
    [
        { field: 'pu_frustrated_rev', label: 'puFrustratedRevLabel' },
        { field: 'pu_confusing_rev', label: 'puConfusingRevLabel' },
        { field: 'pu_annoyed_rev', label: 'puAnnoyedRevLabel' },
        { field: 'pu_discouraged_rev', label: 'puDiscouragedRevLabel' },
        { field: 'pu_taxing_rev', label: 'puTaxingRevLabel' },
        { field: 'pu_demanding_rev', label: 'puDemandingRevLabel' },
        { field: 'pu_in_control', label: 'puInControlLabel' },
        { field: 'pu_could_not_do_rev', label: 'puCouldNotDoRevLabel' },
    ],
    [
        { field: 'ae_attractive', label: 'aeAttractiveLabel' },
        { field: 'ae_aesthetically_appealing', label: 'aeAestheticallyAppealingLabel' },
        { field: 'attention_check_ues', label: 'attentionCheckUesLabel' },
        { field: 'ae_liked_graphics', label: 'aeLikedGraphicsLabel' },
        { field: 'ae_appealed_visual', label: 'aeAppealedVisualLabel' },
        { field: 'ae_visually_pleasing', label: 'aeVisuallyPleasingLabel' },
    ],
    [
        { field: 'rw_worthwhile', label: 'rwWorthwhileLabel' },
        { field: 'rw_success', label: 'rwSuccessLabel' },
        { field: 'rw_did_not_work_out_rev', label: 'rwDidNotWorkOutRevLabel' },
        { field: 'rw_rewarding', label: 'rwRewardingLabel' },
        { field: 'rw_recommend', label: 'rwRecommendLabel' },
        { field: 'rw_continued_curiosity', label: 'rwContinuedCuriosityLabel' },
        { field: 'rw_incited_curiosity', label: 'rwIncitedCuriosityLabel' },
        { field: 'rw_drawn_in', label: 'rwDrawnInLabel' },
        { field: 'rw_involved', label: 'rwInvolvedLabel' },
        { field: 'rw_fun', label: 'rwFunLabel' },
    ],
] as const;

const flatUesQuestions = uesQuestionPages.flat();

const UesFormSchema = z.object(
    Object.fromEntries(
        flatUesQuestions.map(item => [
            item.field,
            z.coerce.number({ invalid_type_error: "Escolha uma opção" })
              .min(1, "A resposta mínima é 1")
              .max(5, "A resposta máxima é 5")
        ])
    )
);

type SubmitModeProps = FillEvaluationForm & { identification: string; applicationName?: string };
type ViewModeProps = { isViewable: true; identification?: string; applicationName?: string };
type UesFormProps = SubmitModeProps | ViewModeProps;

const UesForm = (params: UesFormProps) => {
    const FormSchema = !("isViewable" in params) ? UesFormSchema : z.object({});
    
    const applicationName = params.applicationName || "esta aplicação";

    const defaultValues = Object.fromEntries(
        flatUesQuestions.map(item => [item.field, 0])
    );

    const form = useForm<z.infer<typeof UesFormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    });

    const { push } = useRouter();
    const { toast } = useToast();
    const { t } = useTranslation('specialist_services_instruments_ues');

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    });

    const onSubmit = async (values: z.infer<typeof UesFormSchema>) => {
        if (!("isViewable" in params)) {
            if (values.attention_check_ues !== 5) {
                toast({
                    title: "Aviso de Qualidade",
                    description: "Parece que você não leu todas as questões atentamente. Sua resposta será sinalizada.",
                    variant: "destructive",
                });
            }

            const payload = values as unknown as Ues;
            
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
                <h1 className="font-bold text-4xl self-center">UES - {params.identification || t('identificationExample')}</h1>
                <Separator />
                <h2 className="text-md self-center text-center"> {t('questionnaireAnswersDescription')} </h2>
                
                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                            
                            {uesQuestionPages[activeStep].map((question, index) => (
                                <FormField
                                    key={"formField" + index}
                                    control={form.control}
                                    name={question.field}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-center content-center gap-5 w-full">
                                            <div className='bg-primary flex justify-end w-full md:w-11/12 lg:w-10/12 xl:w-8/12 2xl:w-7/12 gap-4 rounded-l-lg'>
                                                <div className='bg-white px-4 md:px-8 pt-8 pb-10 w-[99%] flex flex-col'>
                                                    <p className="text-lg md:text-xl pb-8 md:pb-12 break-words">
                                                        <b>{t(question.label, { application: applicationName })}</b>
                                                    </p>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value?.toString()}
                                                            value={field.value?.toString()}
                                                            className="flex flex-row flex-wrap gap-y-6 gap-x-2 sm:gap-x-4 justify-between w-full">
                                                            
                                                            {UesScaleProps.map((scaleProp, i) => (
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
                                    uesQuestionPages[activeStep].forEach((question) => {
                                        form.setValue(question.field as any, 0);
                                    });
                                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                }}>
                                    {t('resetButtonLabel')}
                                </Button>

                                {
                                    (activeStep < steps.length - 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const stepFields = uesQuestionPages[activeStep].map(q => q.field);
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

export default UesForm;