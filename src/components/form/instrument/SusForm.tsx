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

import { FillEvaluationForm, RadioItem, susQuestions } from '@/types/forms';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const DefaultProps: RadioItem[] = [
  {value: '5', label: 'Concordo Plenamente'},
  {value: '4', label: 'Concordo Parcialmente'},
  {value: '3', label: 'Neutro'},
  {value: '2', label: 'Discordo Parcialmente'},
  {value: '1', label: 'Discordo Totalmente'},
]

const SusFormSchema = z.object(
  Object.fromEntries(
    susQuestions.map(item => [
      item.field,
      z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {
        errorMap: (issue, ctx) => ({ message: "Escolha uma opção" })
      })
    ])
  )
);

const SusForm = (params: FillEvaluationForm & {identification: string}) => {
  const FormSchema = !("isViewable" in params) ? SusFormSchema : z.object({}); 
  const form = useForm<z.infer<typeof SusFormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      use_frequency: '',
      use_complex: '',
      use_easy: '',
      need_help: '',
      function_integration: '',
      inconsistency: '',
      learning_curve: '',
      jumbled: '',
      confidence: '',
      learn_system: '',
  },});

  const { push } = useRouter();
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof SusFormSchema>) => {
    if(!("isViewable" in params)) {
      saveAnswer(values, params.evaluationId, params.userId).then(() => {
        toast({
          title: "Socilitação aprovada",
          description: "Avaliação preenchida e salva",
        });
        push('/user/evaluations');
      }); 
    }     
  };

  return (
    <React.Suspense fallback={<Progress />}>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <div className="flex flex-col flex-wrap justify-center gap-6">
          <h1 className="font-bold text-4xl self-center">SUS - {params.identification}</h1>
          
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-md self-center"> Clique no botão abaixo para ver exemplos de preenchimento: </h2>
            <Button className="text-lg lg:min-w-96" type="button">Exemplos</Button>
          </div>

          <Separator/>

          <h2 className="text-md self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>
          {
            susQuestions.map((question, index) => (
              <>
                <FormField 
                  key={index}
                  control={form.control} 
                  name={question.field}
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
                          DefaultProps.map((option, index) => (
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