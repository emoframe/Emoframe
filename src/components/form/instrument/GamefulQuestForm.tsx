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

// Ajuste os imports dos tipos conforme sua arquitetura
import { FillEvaluationForm, GamefulQuest } from '@/types/forms'; 
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const steps: StepConfig[] = [
    { label: 'Conquista' },
    { label: 'Desafio' },
    { label: 'Competição' },
    { label: 'Condução' },
    { label: 'Imersão' },
    { label: 'Ludicidade' },
    { label: 'Experiência Social' },
];

// O GamefulQuest costuma usar uma escala Likert de 1 a 5 ou 1 a 7 (Discordo Totalmente a Concordo Totalmente)
// Caso o seu sistema utilize de 1 a 7, mantenha assim. Ajuste as labels no seu arquivo de tradução.
const GamefulScaleProps = [
    { value: '7', label: 'scaleOption7Label' }, // Concordo totalmente
    { value: '6', label: 'scaleOption6Label' },
    { value: '5', label: 'scaleOption5Label' },
    { value: '4', label: 'scaleOption4Label' }, // Neutro
    { value: '3', label: 'scaleOption3Label' },
    { value: '2', label: 'scaleOption2Label' },
    { value: '1', label: 'scaleOption1Label' }, // Discordo totalmente
];

const gamefulQuestionPages = [
    // 1. Accomplishment / Conquista
    [
        { field: 'acc_complete_things', label: 'accCompleteThingsLabel' },
        { field: 'acc_strive_accomplishments', label: 'accStriveAccomplishmentsLabel' },
        { field: 'acc_maintain_standards', label: 'accMaintainStandardsLabel' },
        { field: 'acc_success_accomplishments', label: 'accSuccessAccomplishmentsLabel' },
        { field: 'acc_next_level', label: 'accNextLevelLabel' },
        { field: 'acc_progress_better', label: 'accProgressBetterLabel' },
        { field: 'acc_clear_goals', label: 'accClearGoalsLabel' },
        { field: 'acc_reach_goals', label: 'accReachGoalsLabel' },
    ],
    // 2. Challenge / Desafio
    [
        { field: 'cha_push_limits', label: 'chaPushLimitsLabel' },
        { field: 'cha_brink_give_up', label: 'chaBrinkGiveUpLabel' },
        { field: 'cha_positive_pressure', label: 'chaPositivePressureLabel' },
        { field: 'cha_challenges_me', label: 'chaChallengesMeLabel' },
        { field: 'cha_lot_effort', label: 'chaLotEffortLabel' },
        { field: 'cha_highly_demanding', label: 'chaHighlyDemandingLabel' },
        { field: 'cha_continuously_improve', label: 'chaContinuouslyImproveLabel' },
        { field: 'cha_close_capable', label: 'chaCloseCapableLabel' },
    ],
    // 3. Competition / Competição
    [
        { field: 'com_participate_competition', label: 'comParticipateCompetitionLabel' },
        { field: 'com_inspires_compete', label: 'comInspiresCompeteLabel' },
        { field: 'com_competitive_aspects', label: 'comCompetitiveAspectsLabel' },
        { field: 'com_first_place', label: 'comFirstPlaceLabel' },
        { field: 'com_victory_important', label: 'comVictoryImportantLabel' },
        { field: 'com_feel_race', label: 'comFeelRaceLabel' },
        { field: 'com_win_to_succeed', label: 'comWinToSucceedLabel' },
    ],
    // 4. Guidance / Condução + Attention Check
    [
        { field: 'gui_feel_guided', label: 'guiFeelGuidedLabel' },
        { field: 'gui_sense_directed', label: 'guiSenseDirectedLabel' },
        { field: 'gui_keeping_track', label: 'guiKeepingTrackLabel' },
        { field: 'gui_have_instructor', label: 'guiHaveInstructorLabel' },
        { field: 'attention_check_4', label: 'attentionCheck4Label' }, // <-- A PERGUNTA FALSA AQUI
        { field: 'gui_structured_help', label: 'guiStructuredHelpLabel' },
        { field: 'gui_know_do_better', label: 'guiKnowDoBetterLabel' },
        { field: 'gui_useful_feedback', label: 'guiUsefulFeedbackLabel' },
    ],
    // 5. Immersion / Imersão
    [
        { field: 'imm_time_fast', label: 'immTimeFastLabel' },
        { field: 'imm_grabs_attention', label: 'immGrabsAttentionLabel' },
        { field: 'imm_separated_world', label: 'immSeparatedWorldLabel' },
        { field: 'imm_lose_myself', label: 'immLoseMyselfLabel' },
        { field: 'imm_actions_automatic', label: 'immActionsAutomaticLabel' },
        { field: 'imm_stop_tired', label: 'immStopTiredLabel' },
        { field: 'imm_forget_concerns', label: 'immForgetConcernsLabel' },
        { field: 'imm_ignore_around', label: 'immIgnoreAroundLabel' },
        { field: 'imm_emotionally_involved', label: 'immEmotionallyInvolvedLabel' },
    ],
    // 6. Playfulness / Ludicidade
    [
        { field: 'pla_playful_experience', label: 'plaPlayfulExperienceLabel' },
        { field: 'pla_room_spontaneous', label: 'plaRoomSpontaneousLabel' },
        { field: 'pla_taps_imagination', label: 'plaTapsImaginationLabel' },
        { field: 'pla_can_be_creative', label: 'plaCanBeCreativeLabel' },
        { field: 'pla_explore_things', label: 'plaExploreThingsLabel' },
        { field: 'pla_mystery_reveal', label: 'plaMysteryRevealLabel' },
        { field: 'pla_what_comes_next', label: 'plaWhatComesNextLabel' },
        { field: 'pla_discover_new', label: 'plaDiscoverNewLabel' },
        { field: 'pla_appeals_curiosity', label: 'plaAppealsCuriosityLabel' },
    ],
    // 7. Social experience / Experiência Social
    [
        { field: 'soc_not_alone', label: 'socNotAloneLabel' },
        { field: 'soc_social_support', label: 'socSocialSupportLabel' },
        { field: 'soc_socially_involved', label: 'socSociallyInvolvedLabel' },
        { field: 'soc_connected_others', label: 'socConnectedOthersLabel' },
        { field: 'soc_social_experience', label: 'socSocialExperienceLabel' },
        { field: 'soc_share_endeavors', label: 'socShareEndeavorsLabel' },
        { field: 'soc_influences_social', label: 'socInfluencesSocialLabel' },
        { field: 'soc_noticed_achieved', label: 'socNoticedAchievedLabel' },
    ],
] as const;

const flatGamefulQuestions = gamefulQuestionPages.flat();

const GamefulFormSchema = z.object(
    Object.fromEntries(
        flatGamefulQuestions.map(item => [
            item.field,
            z.coerce.number({ invalid_type_error: "Escolha uma opção" })
              .min(1, "A resposta mínima é 1")
              .max(7, "A resposta máxima é 7")
        ])
    )
);

type SubmitModeProps = FillEvaluationForm & { identification: string };
type ViewModeProps = { isViewable: true; identification?: string };
type GamefulFormProps = SubmitModeProps | ViewModeProps;

const GamefulQuestForm = (params: GamefulFormProps) => {
    const FormSchema = !("isViewable" in params) ? GamefulFormSchema : z.object({});
    
    const defaultValues = Object.fromEntries(
        flatGamefulQuestions.map(item => [item.field, 0])
    );

    const form = useForm<z.infer<typeof GamefulFormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    });

    const { push } = useRouter();
    const { toast } = useToast();
    // Use o namespace correto para as traduções do GamefulQuest
    const { t } = useTranslation('specialist_services_instruments_gamefulquest');

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    });

    const onSubmit = async (values: z.infer<typeof GamefulFormSchema>) => {
        if (!("isViewable" in params)) {
            
            // Validação de segurança: Checagem da pergunta de atenção
            if (values.attention_check_4 !== 4) {
                toast({
                    title: "Aviso de Qualidade",
                    description: "Parece que você não leu todas as questões atentamente. Sua resposta não será contabilizada de forma válida.",
                    variant: "destructive",
                });
                
                // Você pode decidir se salva com uma flag `is_valid: false` ou se simplesmente bloqueia o envio.
                // Exemplo salvando com flag: 
                // const payload = { ...values, is_valid: false } as unknown as GamefulQuest;
            }

            const payload = values as unknown as GamefulQuest;
            
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
                <h1 className="font-bold text-4xl self-center">GamefulQuest - {params.identification || t('identificationExample')}</h1>
                <Separator />
                <h2 className="text-md self-center text-center"> {t('questionnaireAnswersDescription')} </h2>
                
                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                            
                            {gamefulQuestionPages[activeStep].map((question, index) => (
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
                                                            
                                                            {GamefulScaleProps.map((scaleProp, i) => (
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
                                    gamefulQuestionPages[activeStep].forEach((question) => {
                                        form.setValue(question.field as any, 0);
                                    });
                                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                }}>
                                    {t('resetButtonLabel')}
                                </Button>

                                {
                                    (activeStep < steps.length - 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const stepFields = gamefulQuestionPages[activeStep].map(q => q.field);
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

export default GamefulQuestForm;