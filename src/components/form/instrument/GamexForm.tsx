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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { FillEvaluationForm, Gamex } from '@/types/forms';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const steps: StepConfig[] = [
  { label: 'Passo 1' },
  { label: 'Passo 2' },
  { label: 'Passo 3' },
  { label: 'Passo 4' },
]

const GamexScaleProps = [






  { value: '1', label: 'scaleOption1Label' },
  { value: '2', label: 'scaleOption2Label' },
  { value: '3', label: 'scaleOption3Label' },
  { value: '4', label: 'scaleOption4Label' },
  { value: '5', label: 'scaleOption5Label' },
  { value: '6', label: 'scaleOption6Label' },
  { value: '7', label: 'scaleOption7Label' },
];

const gamexQuestionPages = [
  [
    { field: 'game_was_fun', label: 'gameWasFunLabel' },
    { field: 'enjoyed_playing', label: 'enjoyedPlayingLabel' },
    { field: 'enjoyed_a_lot', label: 'enjoyedALotLabel' },
    { field: 'pleasurable_experience', label: 'pleasurableExperienceLabel' },
    { field: 'highly_engaging', label: 'highlyEngagingLabel' },
    { field: 'play_voluntarily', label: 'playVoluntarilyLabel' },
    { field: 'forgot_location', label: 'forgotLocationLabel' },
  ],
  [
    { field: 'forgot_surroundings', label: 'forgotSurroundingsLabel' },
    { field: 'back_to_reality', label: 'backToRealityLabel' },
    { field: 'disconnect_from_everything', label: 'disconnectFromEverythingLabel' },
    { field: 'ignored_surroundings', label: 'ignoredSurroundingsLabel' },
    { field: 'lost_track_of_time', label: 'lostTrackOfTimeLabel' },
    { field: 'stimulated_imagination', label: 'stimulatedImaginationLabel' },
    { field: 'felt_creative', label: 'feltCreativeLabel' },
  ],
  [
    { field: 'sense_of_exploration', label: 'senseOfExplorationLabel' },
    { field: 'felt_adventurous', label: 'feltAdventurousLabel' },
    { field: 'felt_active', label: 'feltActiveLabel' },
    { field: 'felt_restless', label: 'feltRestlessLabel' },
    { field: 'felt_frantic', label: 'feltFranticLabel' },
    { field: 'felt_excited', label: 'feltExcitedLabel' },
    { field: 'felt_upset', label: 'feltUpsetLabel' },
  ],
  [
    { field: 'felt_nervous', label: 'feltNervousLabel' },
    { field: 'felt_frustrated', label: 'feltFrustratedLabel' },
    { field: 'felt_in_command', label: 'feltInCommandLabel' },
    { field: 'felt_influential', label: 'feltInfluentialLabel' },
    { field: 'felt_independent', label: 'feltIndependentLabel' },
    { field: 'felt_confident', label: 'feltConfidentLabel' },
    { field: 'attention_check', label: 'attentionCheckLabel' },
  ]
] as const;

const flatGamexQuestions = gamexQuestionPages.flat();

const GamexFormSchema = z.object(
  Object.fromEntries(
    flatGamexQuestions.map(item => [
      item.field,
      z.coerce.number({ invalid_type_error: "Escolha uma opção" })
        .min(1, "A resposta mínima é 1")
        .max(7, "A resposta máxima é 7")
    ])
  )
);

type SubmitModeProps = FillEvaluationForm & { identification: string };
type ViewModeProps = { isViewable: true; identification?: string };
type GamexFormProps = SubmitModeProps | ViewModeProps;

const GamexForm = (params: GamexFormProps) => {
  const FormSchema = !("isViewable" in params) ? GamexFormSchema : z.object({});

  const defaultValues = Object.fromEntries(
    flatGamexQuestions.map(item => [item.field, 0])
  );

  const form = useForm<z.infer<typeof GamexFormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { push } = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation('specialist_services_instruments_gamex');

  const { activeStep, nextStep, prevStep } = useStepper({
    initialStep: 0,
    steps,
  });

  const onSubmit = async (values: z.infer<typeof GamexFormSchema>) => {
    if (!("isViewable" in params)) {
      const payload = values as unknown as Gamex;

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
      <Steps activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step
            index={index}
            key={index}
            additionalClassName={{ label: "text-md" }}
            {...{ label: t(`${step.label}`) }}
          />
        ))}
      </Steps>

      <div className="flex flex-col flex-wrap justify-center gap-6 pt-8">
        <h1 className="font-bold text-4xl self-center">GAMEX - {params.identification || t('identificationExample')}</h1>
        <Separator />
        <h2 className="text-md self-center text-center"> {t('questionnaireAnswersDescription')} </h2>

        <React.Suspense key={activeStep} fallback={<Progress />}>
          <Form key={activeStep} {...form}>
            <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>

              {gamexQuestionPages[activeStep].map((question, index) => (
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
                              className="flex flex-row flex-wrap gap-y-6 gap-x-4 sm:gap-x-4 justify-between w-full">

                              {GamexScaleProps.map((scaleProp, i) => (
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
                  gamexQuestionPages[activeStep].forEach((question) => {
                    form.setValue(question.field as any, 0);
                  });
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}>
                  {t('resetButtonLabel')}
                </Button>

                {
                  (activeStep < steps.length - 1) ?
                    <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                      const stepFields = gamexQuestionPages[activeStep].map(q => q.field);
                      const values = form.getValues(stepFields as any);

                      const hasNull = !("isViewable" in params)
                        ? Object.values(values).some((value) => value === "" || value === undefined)
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

export default GamexForm;