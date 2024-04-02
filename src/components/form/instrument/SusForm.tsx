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
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { FillEvaluationForm, RadioItem } from '@/types/forms';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const QuestionOptions: RadioItem[] = [
  {value: 5, label: 'Concordo Plenamente'},
  {value: 4, label: 'Concordo Parcialmente'},
  {value: 3, label: 'Neutro'},
  {value: 2, label: 'Discordo Parcialmente'},
  {value: 1, label: 'Discordo Totalmente'},
]

interface SusQuestionsProps {
  name: "solution_evaluation" | "app_useFrequency" | "app_useComplex" | 
  "app_useEasy" | "app_useNeedHelp" | "app_functionIntegration" | "app_inconsistency" | 
  "app_learningCurve" | "app_jumbled" | "app_confidence" | "app_learnSystem" 
  label: string,
}


const SusQuestions: SusQuestionsProps[] = [
  {name: "app_useFrequency", label: "Eu acho que gostaria de usar esse sistema com frequência."},
  {name: "app_useComplex", label: "Eu acho o sistema desnecessariamente complexo."},
  {name: "app_useEasy", label: "Eu achei o sistema fácil de usar."},
  {name: "app_useNeedHelp", label: "Eu acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o sistema."},
  {name: "app_functionIntegration", label: "Eu acho que as várias funções do sistema estão muito bem integradas."},
  {name: "app_inconsistency", label: "Eu acho que o sistema apresenta muita inconsistência."},
  {name: "app_learningCurve", label: "Eu imagino que as pessoas aprenderão como usar esse sistema rapidamente."},
  {name: "app_jumbled", label: "Eu achei o sistema atrapalhado de usar."},
  {name: "app_confidence", label: "Eu me senti confiante ao usar o sistema."},
  {name: "app_learnSystem", label: "Eu precisei aprender várias coisas novas antes de conseguir usar o sistema."},
]


const SusFormSchema = z.object({
  solution_evaluation: z.string().min(1, "Insira o nome da solução"),
  app_useFrequency: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5),
  app_useComplex: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5),
  app_useEasy: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5),
  app_useNeedHelp: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5),
  app_functionIntegration: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5),
  app_inconsistency: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5),
  app_learningCurve: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5),
  app_jumbled: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5),
  app_confidence: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5),
  app_learnSystem: z.number({required_error: 'Escolha uma opção'}).int().gte(1).lte(5)
})

const SusForm = ({userId, evaluationId}: FillEvaluationForm) => {
  const form = useForm<z.infer<typeof SusFormSchema>>({
    resolver: zodResolver(SusFormSchema),
    defaultValues: {
      solution_evaluation: '',
      app_useFrequency: -1,
      app_useComplex: -1,
      app_useEasy: -1,
      app_useNeedHelp: -1, 
      app_functionIntegration: -1, 
      app_inconsistency: -1,
      app_learningCurve: -1,
      app_jumbled: -1, 
      app_confidence: -1,
      app_learnSystem: -1,
  },});

  const { push } = useRouter();
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof SusFormSchema>) => {
    saveAnswer(values, evaluationId, userId).then(() => {
      toast({
        title: "Socilitação aprovada",
        description: "Avaliação preenchida e salva",
      });
      push('/user/evaluations');
    });      
  };

  return (
    <React.Suspense fallback={<Progress />}>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <div className="flex flex-col flex-wrap justify-center gap-6">
          <h1 className="font-bold text-4xl self-center">SUS</h1>
          <FormField
            control={form.control}
            name='solution_evaluation'
            render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center gap-4">
                  <FormLabel className='text-md self-center'>Para cada uma das seguintes afirmações, selecione a opção que melhor descreve suas reações à solução descrita.</FormLabel>
                  <FormControl className='max-w-96'>
                      <Input placeholder='Nome da Solução' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
          />
          
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-md self-center"> Clique no botão abaixo para ver exemplos de preenchimento: </h2>
            <Button className="text-lg lg:min-w-96" type="button">Exemplos</Button>
          </div>

          <Separator/>

          <h2 className="text-md self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>
          {
            SusQuestions.map((question, index) => (
              <>
                <FormField 
                  key={index}
                  control={form.control} 
                  name={question.name}
                  render={({ field }) => (
                    <FormItem className="content-center">
                      <p className="text-xl mb-8"><b>{question.label}</b></p>
                      <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange} 
                        defaultValue={field.value} 
                        value={field.value}
                        className="flex flex-row space-x-5 justify-between">
                          {
                          QuestionOptions.map((option, index) => (
                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                <FormControl>
                                  <RadioGroupItem value={option.value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>  
                            ))
                          }
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator/>
              </>
            ))
          }
        </div>

        <div className="flex flex-row justify-around my-8">
          <Button className="basis-1/8 text-lg" type="reset" size="lg" onClick={() => {form.reset()}}>
            Limpar
          </Button>
          <Button className='basis-1/8 text-lg' type='submit' size="lg">
            Enviar
          </Button>
        </div>
      </form>
      </Form>
      </React.Suspense>
  )
}

export default SusForm