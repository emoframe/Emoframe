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
import React, { useEffect, useState } from 'react';
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

import { FillEvaluationForm, Hexad } from '@/types/forms';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const steps: StepConfig[] = [
    { label: 'Parte 1' },
    { label: 'Parte 2' },
    { label: 'Parte 3' },
    { label: 'Parte 4' },
    { label: 'Parte 5' },
];

const HexadScaleProps = [
    { value: '1', label: 'scaleOption1Label' },
    { value: '2', label: 'scaleOption2Label' },
    { value: '3', label: 'scaleOption3Label' },
    { value: '4', label: 'scaleOption4Label' },
    { value: '5', label: 'scaleOption5Label' },
    { value: '6', label: 'scaleOption6Label' },
    { value: '7', label: 'scaleOption7Label' },
];

const baseHexadQuestions = [
    { field: 'phi_help_others', label: 'phiHelpOthersLabel' },
    { field: 'phi_orient_situations', label: 'phiOrientSituationsLabel' },
    { field: 'phi_share_knowledge', label: 'phiShareKnowledgeLabel' },
    { field: 'phi_wellbeing_others', label: 'phiWellbeingOthersLabel' },
    
    { field: 'soc_interacting_important', label: 'socInteractingImportantLabel' },
    { field: 'soc_part_of_team', label: 'socPartOfTeamLabel' },
    { field: 'soc_part_of_community', label: 'socPartOfCommunityLabel' },
    { field: 'soc_enjoy_group', label: 'socEnjoyGroupLabel' },
    
    { field: 'fre_own_path', label: 'freOwnPathLabel' },
    { field: 'fre_curiosity_guide', label: 'freCuriosityGuideLabel' },
    { field: 'fre_independent', label: 'freIndependentLabel' },
    { field: 'fre_self_expression', label: 'freSelfExpressionLabel' },
    
    { field: 'ach_defeating_obstacles', label: 'achDefeatingObstaclesLabel' },
    { field: 'ach_mastering_difficult', label: 'achMasteringDifficultLabel' },
    { field: 'ach_improve_skills', label: 'achImproveSkillsLabel' },
    { field: 'ach_emerging_victorious', label: 'achEmergingVictoriousLabel' },
    
    { field: 'pla_competitions_prize', label: 'plaCompetitionsPrizeLabel' },
    { field: 'pla_rewards_motivate', label: 'plaRewardsMotivateLabel' },
    { field: 'pla_roi_important', label: 'plaRoiImportantLabel' },
    { field: 'pla_reward_effort', label: 'plaRewardEffortLabel' },
    
    { field: 'dis_provoke', label: 'disProvokeLabel' },
    { field: 'dis_question_status_quo', label: 'disQuestionStatusQuoLabel' },
    { field: 'dis_rebel', label: 'disRebelLabel' },
    { field: 'dis_dislike_rules', label: 'disDislikeRulesLabel' },
    
    { field: 'attention_check_hexad', label: 'attentionCheckHexadLabel' },
] as const;

const HexadFormSchema = z.object(
    Object.fromEntries(
        baseHexadQuestions.map(item => [
            item.field,
            z.coerce.number({ invalid_type_error: "Escolha uma opção" })
              .min(1, "A resposta mínima é 1")
              .max(7, "A resposta máxima é 7")
        ])
    )
);

type SubmitModeProps = FillEvaluationForm & { identification: string };
type ViewModeProps = { isViewable: true; identification?: string };
type HexadFormProps = SubmitModeProps | ViewModeProps;

type QuestionItem = { field: string; label: string };

const HexadForm = (params: HexadFormProps) => {
    const FormSchema = !("isViewable" in params) ? HexadFormSchema : z.object({});
    
    const [shuffledPages, setShuffledPages] = useState<QuestionItem[][]>([]);
    const [isMounted, setIsMounted] = useState(false);

    const defaultValues = Object.fromEntries(
        baseHexadQuestions.map(item => [item.field, 0])
    );

    const form = useForm<z.infer<typeof HexadFormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    });

    const { push } = useRouter();
    const { toast } = useToast();
    const { t } = useTranslation('specialist_services_instruments_hexad');

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    });

    useEffect(() => {
        const shuffleArray = (array: any[]) => {
            const newArr = [...array];
            for (let i = newArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
            }
            return newArr;
        };

        const randomized = shuffleArray([...baseHexadQuestions]);
        
        const chunks: QuestionItem[][] = [];
        for (let i = 0; i < randomized.length; i += 5) {
            chunks.push(randomized.slice(i, i + 5));
        }

        setShuffledPages(chunks);
        setIsMounted(true);
    }, []);

    const onSubmit = async (values: z.infer<typeof HexadFormSchema>) => {
        if (!("isViewable" in params)) {
            
            if (values.attention_check_hexad !== 4) {
                toast({
                    title: "Aviso de Qualidade",
                    description: "Detectamos desatenção na resposta da questão de controle. Sua resposta será sinalizada.",
                    variant: "destructive",
                });
            }

            const payload = values as unknown as Hexad;
            
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

    if (!isMounted || shuffledPages.length === 0) {
        return (
            <div className="flex w-full h-64 items-center justify-center">
                <Progress value={30} className="w-[60%]" />
            </div>
        );
    }

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
                <h1 className="font-bold text-4xl self-center">Hexad - {params.identification || t('identificationExample')}</h1>
                <Separator />
                <h2 className="text-md self-center text-center"> {t('questionnaireAnswersDescription')} </h2>
                
                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                            
                            {shuffledPages[activeStep].map((question, index) => (
                                <FormField
                                    key={"formField" + question.field}
                                    control={form.control}
                                    name={question.field as any}
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
                                                            
                                                            {HexadScaleProps.map((scaleProp, i) => (
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
                                    shuffledPages[activeStep].forEach((question) => {
                                        form.setValue(question.field as any, 0);
                                    });
                                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                }}>
                                    {t('resetButtonLabel')}
                                </Button>

                                {
                                    (activeStep < steps.length - 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            // Pega apenas as chaves (fields) da aba atual para validar
                                            const stepFields = shuffledPages[activeStep].map(q => q.field);
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

export default HexadForm;