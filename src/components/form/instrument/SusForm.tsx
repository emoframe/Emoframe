'use client';

import React from 'react';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FillEvaluationForm, RadioItem } from '@/types/forms';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const SusForm = (params: FillEvaluationForm & { identification: string }) => {
  const { t } = useTranslation();

  const QuestionOptions: RadioItem[] = [
    { value: '5', label: t('Concordo Plenamente') },
    { value: '4', label: t('Concordo Parcialmente') },
    { value: '3', label: t('Neutro') },
    { value: '2', label: t('Discordo Parcialmente') },
    { value: '1', label: t('Discordo Totalmente') },
  ];

  interface SusQuestionsProps {
    name: "app_useFrequency" | "app_useComplex" | 
    "app_useEasy" | "app_useNeedHelp" | "app_functionIntegration" | "app_inconsistency" | 
    "app_learningCurve" | "app_jumbled" | "app_confidence" | "app_learnSystem",
    label: string,
  }

  const SusQuestions: SusQuestionsProps[] = [
    { name: "app_useFrequency", label: t("Eu acho que gostaria de usar esse sistema com frequência.") },
    { name: "app_useComplex", label: t("Eu acho o sistema desnecessariamente complexo.") },
    { name: "app_useEasy", label: t("Eu achei o sistema fácil de usar.") },
    { name: "app_useNeedHelp", label: t("Eu acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o sistema.") },
    { name: "app_functionIntegration", label: t("Eu acho que as várias funções do sistema estão muito bem integradas.") },
    { name: "app_inconsistency", label: t("Eu acho que o sistema apresenta muita inconsistência.") },
    { name: "app_learningCurve", label: t("Eu imagino que as pessoas aprenderão como usar esse sistema rapidamente.") },
    { name: "app_jumbled", label: t("Eu achei o sistema atrapalhado de usar.") },
    { name: "app_confidence", label: t("Eu me senti confiante ao usar o sistema.") },
    { name: "app_learnSystem", label: t("Eu precisei aprender várias coisas novas antes de conseguir usar o sistema.") },
  ];

  const SusFormSchema = z.object({
    app_useFrequency: z.enum([QuestionOptions[0].value, ...QuestionOptions.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    app_useComplex: z.enum([QuestionOptions[0].value, ...QuestionOptions.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    app_useEasy: z.enum([QuestionOptions[0].value, ...QuestionOptions.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    app_useNeedHelp: z.enum([QuestionOptions[0].value, ...QuestionOptions.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    app_functionIntegration: z.enum([QuestionOptions[0].value, ...QuestionOptions.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    app_inconsistency: z.enum([QuestionOptions[0].value, ...QuestionOptions.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    app_learningCurve: z.enum([QuestionOptions[0].value, ...QuestionOptions.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    app_jumbled: z.enum([QuestionOptions[0].value, ...QuestionOptions.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    app_confidence: z.enum([QuestionOptions[0].value, ...QuestionOptions.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    app_learnSystem: z.enum([QuestionOptions[0].value, ...QuestionOptions.slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) })
  });

  const FormSchema = !("isViewable" in params) ? SusFormSchema : z.object({});
  const form = useForm<z.infer<typeof SusFormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      app_useFrequency: '',
      app_useComplex: '',
      app_useEasy: '',
      app_useNeedHelp: '',
      app_functionIntegration: '',
      app_inconsistency: '',
      app_learningCurve: '',
      app_jumbled: '',
      app_confidence: '',
      app_learnSystem: '',
    },
  });

  const { push } = useRouter();
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof SusFormSchema>) => {
    if (!("isViewable" in params)) {
      saveAnswer(values, params.evaluationId, params.userId).then(() => {
        toast({
          title: t("Socilitação aprovada"),
          description: t("Avaliação preenchida e salva"),
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
              <h2 className="text-md self-center">{t('Clique no botão abaixo para ver exemplos de preenchimento:')}</h2>
              <Button className="text-lg lg:min-w-96" type="button">{t('Exemplos')}</Button>
            </div>

            <Separator/>

            <h2 className="text-md self-center">{t('Indique em que medida está sentindo cada uma das emoções AGORA:')}</h2>
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
            <Button className="basis-1/8 text-lg" type="reset" size="lg" onClick={() => { form.reset() }}>
              {t('Limpar')}
            </Button>
            <Button className='basis-1/8 text-lg' type='submit' size="lg">
              {t('Enviar')}
            </Button>
          </div>
        </form>
      </Form>
    </React.Suspense>
  );
}

export default SusForm;