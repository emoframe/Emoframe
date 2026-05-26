'use client';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../ui/form'; // Ajuste o caminho se necessário
import { z } from "zod";
import React, { useState } from 'react';
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

import { FillEvaluationForm, Iuxrv } from '@/types/forms'; // Ajuste o caminho dos tipos
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

// Títulos das abas divididas por contexto
const steps: StepConfig[] = [
    { label: 'VR Sickness' },
    { label: 'Usabilidade' },
    { label: 'Estética' },
    { label: 'Presença' },
    { label: 'Emoções' },
];

const IuxrvScaleProps = [
    { value: '7', label: 'scaleOption7Label' },
    { value: '6', label: 'scaleOption6Label' },
    { value: '5', label: 'scaleOption5Label' },
    { value: '4', label: 'scaleOption4Label' },
    { value: '3', label: 'scaleOption3Label' },
    { value: '2', label: 'scaleOption2Label' },
    { value: '1', label: 'scaleOption1Label' },
];

// Questões separadas por contexto (5 questões por tela)
const iuxrvQuestionPages = [
    // 1. VR Sickness
    [
        { field: 'feeling_nauseous', label: 'feelingNauseousLabel' },
        { field: 'feeling_dizzy', label: 'feelingDizzyLabel' },
        { field: 'general_discomfort', label: 'generalDiscomfortLabel' },
        { field: 'tired_eyes', label: 'tiredEyesLabel' },
        { field: 'headache', label: 'headacheLabel' },
    ],
    // 2. Usabilidade
    [
        { field: 'easy_to_do_things', label: 'easyToDoThingsLabel' },
        { field: 'did_things_confidently', label: 'didThingsConfidentlyLabel' },
        { field: 'few_steps_required', label: 'fewStepsRequiredLabel' },
        { field: 'felt_in_control', label: 'feltInControlLabel' },
        { field: 'learned_quickly', label: 'learnedQuicklyLabel' },
    ],
    // 3. Estética
    [
        { field: 'elegant_world', label: 'elegantWorldLabel' },
        { field: 'fascinating_world', label: 'fascinatingWorldLabel' },
        { field: 'beautiful_world', label: 'beautifulWorldLabel' },
        { field: 'fun_world', label: 'funWorldLabel' },
        { field: 'exciting_world', label: 'excitingWorldLabel' },
    ],
    // 4. Presença
    [
        { field: 'forgot_it_was_virtual', label: 'forgotItWasVirtualLabel' },
        { field: 'forgot_vr_equipment', label: 'forgotVrEquipmentLabel' },
        { field: 'believed_things_were_real', label: 'believedThingsWereRealLabel' },
        { field: 'forgot_real_world', label: 'forgotRealWorldLabel' },
        { field: 'felt_it_could_be_real', label: 'feltItCouldBeRealLabel' },
    ],
    // 5. Emoções
    [
        { field: 'felt_good', label: 'feltGoodLabel' },
        { field: 'felt_content', label: 'feltContentLabel' },
        { field: 'felt_irritated', label: 'feltIrritatedLabel' },
        { field: 'felt_frustrated', label: 'feltFrustratedLabel' },
        { field: 'felt_happy', label: 'feltHappyLabel' },
    ]
] as const;

const flatIuxrvQuestions = iuxrvQuestionPages.flat();

const IuxrvFormSchema = z.object(
    Object.fromEntries(
        flatIuxrvQuestions.map(item => [
            item.field,
            z.coerce.number({ invalid_type_error: "Escolha uma opção" })
              .min(1, "A resposta mínima é 1")
              .max(7, "A resposta máxima é 7")
        ])
    )
);

type SubmitModeProps = FillEvaluationForm & { identification: string };
type ViewModeProps = { isViewable: true; identification?: string };
type IuxrvFormProps = SubmitModeProps | ViewModeProps;

const IuxrvForm = (params: IuxrvFormProps) => {
    const FormSchema = !("isViewable" in params) ? IuxrvFormSchema : z.object({});
    
    // Inicia tudo vazio com zero (ou undefined)
    const defaultValues = Object.fromEntries(
        flatIuxrvQuestions.map(item => [item.field, 0])
    );

    const form = useForm<z.infer<typeof IuxrvFormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    });

    const { push } = useRouter();
    const { toast } = useToast();
    // Altere para o namespace correto da tradução do iuxrv no seu i18next
    const { t } = useTranslation('specialist_services_instruments_iuxrv');

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    });

    const onSubmit = async (values: z.infer<typeof IuxrvFormSchema>) => {
        if (!("isViewable" in params)) {
            const payload = values as unknown as Iuxrv;
            
            saveAnswer(payload, params.evaluationId, params.userId).then(() => {
                toast({
                    title: t("submitTitle"),
                    description: t("submitMessage"),
                });
                push('/user/evaluations');
            });
        }
    };

    return (
        <div>
            {/* Cabecalho de Passos */}
            <Steps activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step 
                        index={index} 
                        key={index} 
                        additionalClassName={{ label: "text-md" }} 
                        // Caso queira traduzir o nome das abas, você pode usar t(step.label)
                        {...{ label: step.label }} 
                    />
                ))}
            </Steps>

            <div className="flex flex-col flex-wrap justify-center gap-6 pt-8">
                <h1 className="font-bold text-4xl self-center">IUXRV - {params.identification || t('identificationExample')}</h1>
                <Separator />
                <h2 className="text-md self-center text-center"> {t('questionnaireAnswersDescription')} </h2>
                
                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                            
                            {iuxrvQuestionPages[activeStep].map((question, index) => (
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
                                                            defaultValue={field.value?.toString()}
                                                            value={field.value?.toString()}
                                                            className="flex flex-row flex-wrap gap-y-6 gap-x-2 sm:gap-x-4 justify-between w-full">
                                                            
                                                            {IuxrvScaleProps.map((scaleProp, i) => (
                                                                <FormItem className="flex flex-col-reverse items-center justify-between gap-4" key={i}>
                                                                    <FormControl>
                                                                        <RadioGroupItem value={scaleProp.value} />
                                                                    </FormControl>
                                                                    <FormLabel className="font-medium text-[#323232] text-xs sm:text-sm md:text-base text-center break-words max-w-[60px] md:max-w-[90px] whitespace-normal h-10 flex items-start justify-center">
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
                                    iuxrvQuestionPages[activeStep].forEach((question) => {
                                        form.setValue(question.field as any, 0);
                                    });
                                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                }}>
                                    {t('resetButtonLabel')}
                                </Button>

                                {
                                    (activeStep < steps.length - 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const stepFields = iuxrvQuestionPages[activeStep].map(q => q.field);
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
                                        <Button className="basis-1/8 text-lg" type="submit" size="lg">
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

export default IuxrvForm;