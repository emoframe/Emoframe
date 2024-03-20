'use client';

import React, { useEffect, useState } from 'react'

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

const steps: StepConfig[] = [
  {label: 'Passo 1'},
  {label: 'Passo 2'},
  {label: 'Passo 3'},
] 

const DefaultProps: RadioItem[] = [
  {value: '1', label: '1 (Nada ou muito ligeiramente)'},
  {value: '2', label: '2 (Um pouco)'},
  {value: '3', label: '3 (Moderadamente)'},
  {value: '4', label: '4 (Bastante)'},
  {value: '5', label: '5 (Extremamente)'},
]

interface BrumsQuestionsProps {
    field: 'cheered_up' | 'irritated' | 'depressed' | 'terrified' | 'crestfallen' | 'broken_down' | 'confused' | 'exhausted' | 'anxious' | 'unhappy' | 'huffy' | 'worried' | 'sad' | 'sleepy' | 'insecure' | 'willing' | 'tense' | 'disoriented' | 'grumpy' | 'undecided' | 'tired' | 'energy' | 'angry' | 'alert'
    question: string,
}

const BrumsQuestions: BrumsQuestionsProps[][] = [
  [
    {field: 'cheered_up', question: 'Animado(a)'},
    {field: 'irritated', question: 'Irritado(a)'},
    {field: 'depressed', question: 'Deprimido(a)'},
    {field: 'terrified', question: 'Apavorado(a)'},
    {field: 'crestfallen', question: 'Desanimado(a)'},
    {field: 'broken_down', question: 'Esgotado(a)'},
    {field: 'confused', question: 'Confuso(a)'},
    {field: 'exhausted', question: 'Exausto(a)'},
  ],
  [
    {field: 'anxious', question: 'Ansioso(a)'},
    {field: 'unhappy', question: 'Infeliz(a)'},
    {field: 'huffy', question: 'Zangado(a)'},
    {field: 'worried', question: 'Preocupado(a)'},
    {field: 'sad', question: 'Triste(a)'},
    {field: 'sleepy', question: 'Sonolento(a)'},
    {field: 'insecure', question: 'Inseguro(a)'},
  ],
  [
    {field: 'willing', question: 'Disposto(a)'},
    {field: 'tense', question: 'Tenso(a)'},
    {field: 'disoriented', question: 'Desorientado(a)'},
    {field: 'grumpy', question: 'Mal-humorado(a)'},
    {field: 'undecided', question: 'Indeciso(a)'},
    {field: 'tired', question: 'Cansado(a)'},
    {field: 'energy', question: 'Energético(a)'},
    {field: 'angry', question: 'Bravo(a)'},
    {field: 'alert', question: 'Alerta'},
  ]
];

const BrumsFormSchema = z.object({
  cheered_up: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  irritated: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  depressed: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  terrified: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  crestfallen: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  broken_down: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  confused: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  exhausted: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  anxious: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  unhappy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  huffy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  worried: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  sad: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  sleepy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  insecure: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  willing: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  tense: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  disoriented: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  grumpy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  undecided: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  tired: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  energy: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  angry: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  alert: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
})

const BrumsForm = (params: FillEvaluationForm) => {
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
                    title: "Socilitação aprovada",
                    description: "Avaliação preenchida e salva",
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
                <h2 className="text-md self-center"> Abaixo está uma lista de palavras que descrevem sentimentos. Por favor, leia tudo atenciosamente. Em seguida assinale, em cada linha, o quadrado que melhor descreve COMO VOCÊ SE SENTE AGORA. Tenha certeza de sua resposta para cada questão, antes de assinalar. </h2>
                <h2 className="text-md self-center">  Clique no botão abaixo para ver exemplos de preenchimento: </h2>

                <div className="flex flex-row justify-around">
                    <Button className="text-lg basis-1/3" type="button" size="lg">Exemplos</Button>
                </div>
                <Separator className="my-4"/>   
                <h2 className="text-md self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>

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
                                    }}>Anterior</Button>
                                }
                                
                                <Button className="basis-1/8 text-lg" type='button' size="lg" onClick={() => {
                                    BrumsQuestions[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>Limpar</Button>

                                { 
                                    (activeStep < 2) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const values = form.getValues(BrumsQuestions[activeStep].map((question, index) => (question.field)));
                                            const hasNull = !("isViewable" in params) ? Object.values(values).some((value) => value === "") : false;
                                            
                                            if (hasNull) {
                                                toast({
                                                    title: "Socilitação negada",
                                                    description: "Preencha todos os campos!",
                                                });
                                            }
                                            else{
                                                nextStep();
                                                window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                            }
                                        }}>Próximo</Button>
                                    : <Button className="basis-1/8 text-lg" type="submit" size="lg">Enviar</Button>
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