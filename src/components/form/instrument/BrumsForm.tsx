'use client';

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
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


const BrumsForm = (params: FillEvaluationForm) => {
    const { t } = useTranslation();

    const steps: StepConfig[] = [
        { label: t('Passo 1') },
        { label: t('Passo 2') },
        { label: t('Passo 3') },
    ];

    const DefaultProps: RadioItem[] = [
        { value: '1', label: t('Nada ou muito ligeiramente') },
        { value: '2', label: t('Um pouco') },
        { value: '3', label: t('Moderadamente') },
        { value: '4', label: t('Bastante') },
        { value: '5', label: t('Extremamente') },
    ];

    interface BrumsQuestionsProps {
        field: 'cheered_up' | 'irritated' | 'depressed' | 'terrified' | 'crestfallen' | 'broken_down' | 'confused' | 'exhausted' | 'anxious' | 'unhappy' | 'huffy' | 'worried' | 'sad' | 'sleepy' | 'insecure' | 'willing' | 'tense' | 'disoriented' | 'grumpy' | 'undecided' | 'tired' | 'energy' | 'angry' | 'alert';
        question: string;
    }

    const BrumsQuestions: BrumsQuestionsProps[][] = [
        [
            { field: 'cheered_up', question: t('Animado(a)') },
            { field: 'irritated', question: t('Irritado(a)') },
            { field: 'depressed', question: t('Deprimido(a)') },
            { field: 'terrified', question: t('Apavorado(a)') },
            { field: 'crestfallen', question: t('Desanimado(a)') },
            { field: 'broken_down', question: t('Esgotado(a)') },
            { field: 'confused', question: t('Confuso(a)') },
            { field: 'exhausted', question: t('Exausto(a)') },
        ],
        [
            { field: 'anxious', question: t('Ansioso(a)') },
            { field: 'unhappy', question: t('Infeliz(a)') },
            { field: 'huffy', question: t('Zangado(a)') },
            { field: 'worried', question: t('Preocupado(a)') },
            { field: 'sad', question: t('Triste(a)') },
            { field: 'sleepy', question: t('Sonolento(a)') },
            { field: 'insecure', question: t('Inseguro(a)') },
        ],
        [
            { field: 'willing', question: t('Disposto(a)') },
            { field: 'tense', question: t('Tenso(a)') },
            { field: 'disoriented', question: t('Desorientado(a)') },
            { field: 'grumpy', question: t('Mal-humorado(a)') },
            { field: 'undecided', question: t('Indeciso(a)') },
            { field: 'tired', question: t('Cansado(a)') },
            { field: 'energy', question: t('Energético(a)') },
            { field: 'angry', question: t('Bravo(a)') },
            { field: 'alert', question: t('Alerta') },
        ]
    ];

const BrumsFormSchema = z.object({
  cheered_up: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  irritated: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  depressed: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message:t("Escolha uma opção")})}),
  terrified: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message:t("Escolha uma opção")})}),
  crestfallen: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  broken_down: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  confused: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  exhausted: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  anxious: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  unhappy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  huffy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  worried: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  sad: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  sleepy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  insecure: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  willing: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  tense: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  disoriented: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  grumpy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  undecided: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  tired: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  energy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
  angry: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message:t("Escolha uma opção")})}),
  alert: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: t("Escolha uma opção")})}),
})

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
    const onSubmit = async (values: z.infer<typeof BrumsFormSchema>) => {
        if(!("isViewable" in params)) {
            saveAnswer(values, params.evaluationId, params.userId).then(() => {
                toast({
                    title: t("Solicitação aprovada"),
                    description: t("Avaliação preenchida e salva"),
                });
                push('/user/evaluations');
            });
        }
    }

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      BrumsQuestions.forEach((questions) => (randomizeArray(questions)));
      setIsReady(true);
    }, []);

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    })

    if(!isReady) return null;
    return (
        <div>
            <Steps activeStep={activeStep}>
                {steps.map((step, index) => ( <Step index={index} key={index} additionalClassName={{label: "text-md"}} {...step} /> ))}
            </Steps>
           
            <div className="flex flex-col flex-wrap justify-center gap-8 pt-8">
                
                <h1 className="font-bold text-4xl self-center"> BRUMS </h1>
                <h2 className="text-md self-center"> {t('Abaixo está uma lista de palavras que descrevem sentimentos. Por favor, leia tudo atenciosamente. Em seguida assinale, em cada linha, o quadrado que melhor descreve COMO VOCÊ SE SENTE AGORA. Tenha certeza de sua resposta para cada questão, antes de assinalar.')} </h2>
                <h2 className="text-md self-center">  {t('Clique no botão abaixo para ver exemplos de preenchimento:')} </h2>

                <div className="flex flex-row justify-around">
                    <Button className="text-lg basis-1/3" type="button" size="lg">{t('Exemplos')}</Button>
                </div>
                <Separator className="my-4"/>   
                <h2 className="text-md self-center"> {t('Indique em que medida está sentindo cada uma das emoções AGORA:')} </h2>

                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)}>
                            {
                                BrumsQuestions[activeStep].map((question, index) => (
                                  <>
                                      <FormField key={"formField" + index}
                                      control={form.control}
                                      name={question.field}
                                      render={({field}) => (
                                          <FormItem className="space-x-5 space-y-5 content-center">
                                              <p className="text-xl"><b>{question.question}</b></p>
                                          <FormControl>
                                              <RadioGroup
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                              value={field.value}
                                              className="flex flex-row space-x-5 justify-between">
                                                  {DefaultProps.map((defaultProp, index) => (
                                                      <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                          <FormControl>
                                                              <RadioGroupItem value={defaultProp.value}/> 
                                                          </FormControl>
                                                          <FormLabel className="font-normal text-md">
                                                              {defaultProp.label}
                                                          </FormLabel>
                                                      </FormItem>
                                                  ))}
                                              </RadioGroup>
                                              </FormControl>
                                              <FormMessage />
                                      </FormItem>
                                      )} />
                                      <Separator className="mb-8"/>   
                                  </>
                                ))
                            }
                            <div key="buttons" className="flex flex-row justify-around mt-8">
                                { 
                                    (activeStep != 0) && 
                                    <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {    
                                        prevStep();
                                        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                    }}>{t('Anterior')}</Button>
                                }
                                
                                <Button className="basis-1/8 text-lg" type='button' size="lg" onClick={() => {
                                    BrumsQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>{t('Limpar')}</Button>

                                { 
                                    (activeStep < 2) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const values = form.getValues(BrumsQuestions[activeStep].map((question, index) => (question.field)));
                                            const hasNull = !("isViewable" in params) ? Object.values(values).some((value) => value === "") : false;
                                            
                                            if (hasNull) {
                                                toast({
                                                    title: t("Socilitação negada"),
                                                    description: t("Preencha todos os campos!"),
                                                });
                                            }
                                            else{
                                                nextStep();
                                                window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                            }
                                        }}>{t('Próximo')}</Button>
                                    : <Button className="basis-1/8 text-lg" type="submit" size="lg">{t('Enviar')}</Button>
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