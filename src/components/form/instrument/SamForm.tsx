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

import { FillEvaluationForm, samQuestions } from '@/types/forms';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const SamFormSchema = z.object(
  Object.fromEntries(
    samQuestions.map(item => [
      item.field,
      z.enum([item.options[0].value, ...item.options.slice(1).map(opt => opt.value)], {
        errorMap: (issue, ctx) => ({ message: "Escolha uma opção" })
      })
    ])
  )
);

const SamForm = (params: FillEvaluationForm) => {
  const FormSchema = !("isViewable" in params) ? SamFormSchema : z.object({}) ; 
  const form = useForm<z.infer<typeof SamFormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      satisfaction: '',
      motivation: '',
      willpower: '',
  },});

  const { push } = useRouter();
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof SamFormSchema>) => {
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
          <h1 className="font-bold text-4xl self-center">SAM</h1>
          <Separator/>
          {
            samQuestions.map((question) => (
              <>
                <FormField 
                key={question.index}
                control={form.control} 
                name={question.field}
                render={({ field }) => (
                  <FormItem className="space-x-5 content-center">
                    <p className="text-xl mb-8"><b>{question.label}</b></p>
                    <FormControl>
                      <RadioGroup
                      onValueChange={field.onChange} 
                      defaultValue={field.value} 
                      value={field.value}
                      className="flex flex-row space-x-1">
                        {
                        question.options.map((option, index) => (
                          <FormItem className="flex flex-col items-center space-x-3 space-y-0" key={index}>
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

export default SamForm