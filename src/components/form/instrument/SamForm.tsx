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
import { ImageCard } from '@/components/ui/image'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FillEvaluationForm } from '@/types/forms';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface Sam {
  name: "satisfaction" | "motivation" | "willpower";
  label: string;
}

const SamForm = (params: FillEvaluationForm) => {
  const { t } = useTranslation();

  const SamQuestions: Sam[] = [
    { name: "satisfaction", label: t('Satisfação') },
    { name: "motivation", label: t('Motivação') },
    { name: "willpower", label: t('Sentimento de Controle') },
  ];

  interface RadioItem {
    value: string;
    label: React.JSX.Element;
  } 

  const QuestionOptions: RadioItem[][] = [
    [
      { value: '1', label: <ImageCard src={"/emojis/Like.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '2', label: <div className={"m-10"}></div> },
      { value: '3', label: <ImageCard src={"/emojis/Sorriso.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '4', label: <div className={"m-10"}></div> },
      { value: '5', label: <ImageCard src={"/emojis/Neutro.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '6', label: <div className={"m-10"}></div> },
      { value: '7', label: <ImageCard src={"/emojis/Triste.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '8', label: <div className={"m-10"}></div> },
      { value: '9', label: <ImageCard src={"/emojis/Deslike.png"} alt={t("Emoji")} height={100} width={100} /> },
    ],
    [
      { value: '1', label: <ImageCard src={"/emojis/Criativo.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '2', label: <div className={"m-10"}></div> },
      { value: '3', label: <ImageCard src={"/emojis/Radiante.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '4', label: <div className={"m-10"}></div> },
      { value: '5', label: <ImageCard src={"/emojis/Neutro.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '6', label: <div className={"m-10"}></div> },
      { value: '7', label: <ImageCard src={"/emojis/Entediado.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '8', label: <div className={"m-10"}></div> },
      { value: '9', label: <ImageCard src={"/emojis/Sono.png"} alt={t("Emoji")} height={100} width={100} /> },
    ],
    [
      { value: '9', label: <ImageCard src={"/emojis/Inteligente.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '8', label: <div className={"m-10"}></div> },
      { value: '7', label: <ImageCard src={"/emojis/Sorriso.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '6', label: <div className={"m-10"}></div> },
      { value: '5', label: <ImageCard src={"/emojis/Neutro.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '4', label: <div className={"m-10"}></div> },
      { value: '3', label: <ImageCard src={"/emojis/Confuso.png"} alt={t("Emoji")} height={100} width={100} /> },
      { value: '2', label: <div className={"m-10"}></div> },
      { value: '1', label: <ImageCard src={"/emojis/Frustrado.png"} alt={t("Emoji")} height={100} width={100} /> },
    ]
  ];

  const SamFormSchema = z.object({
    satisfaction: z.enum([QuestionOptions[0][0].value, ...QuestionOptions[0].slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    motivation: z.enum([QuestionOptions[1][0].value, ...QuestionOptions[1].slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
    willpower: z.enum([QuestionOptions[2][0].value, ...QuestionOptions[2].slice(1).map((p) => p.value)], { errorMap: (issue, ctx) => ({ message: t("Escolha uma opção") }) }),
  });

  const FormSchema = !("isViewable" in params) ? SamFormSchema : z.object({});
  const form = useForm<z.infer<typeof SamFormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      satisfaction: '',
      motivation: '',
      willpower: '',
    },
  });

  const { push } = useRouter();
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof SamFormSchema>) => {
    if (!("isViewable" in params)) {
      saveAnswer(values, params.evaluationId, params.userId).then(() => {
        toast({
          title: t("Solicitação aprovada"),
          description: t("Avaliação preenchida e salva"),
        });
        push('/user/evaluations');
      });
    }
  };

  return (
    <React.Suspense fallback={<Progress />}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col flex-wrap justify-center gap-6">
            <h1 className="font-bold text-4xl self-center">SAM</h1>
            <Separator />
            {
              SamQuestions.map((question, index) => (
                <div key={index}>
                  <FormField
                    control={form.control}
                    name={question.name}
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
                              QuestionOptions[index].map((option, i) => (
                                <FormItem className="flex flex-col items-center space-x-3 space-y-0" key={i}>
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
                  <Separator />
                </div>
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
  )
}

export default SamForm;
