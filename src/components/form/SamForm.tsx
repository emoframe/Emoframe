'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { z } from "zod";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createForm } from '@/lib/firebase'; 
import { Button } from '@/components/ui/button';
import { ImageCard } from '@/components/ui/image'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingComp } from '@/components/ui/loading';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import Like from 'public/emojis/Like.png';
import Sono from 'public/emojis/Sono.png';
import Triste from 'public/emojis/Triste.png';
import Neutro from 'public/emojis/Neutro.png';
import Sorriso from 'public/emojis/Sorriso.png';
import Deslike from 'public/emojis/Deslike.png';
import Confuso from 'public/emojis/Confuso.png';
import Radiante from 'public/emojis/Radiante.png';
import Criativo from 'public/emojis/Criativo.png';
import Entediado from 'public/emojis/Entediado.png';
import Frustrado from 'public/emojis/Frustrado.png';
import Inteligente from 'public/emojis/Inteligente.png';


interface RadioItem {
  value: string;
  label: React.JSX.Element;
} 

// TODO: Add emotions to Satisfaction, Motivation and WillPower

const SatisfactionProps: RadioItem[] = [
  { value: '1', label: <ImageCard src={Like} alt={"Talvez"} height={100} width={100} />},
  { value: '2', label: <div className={"m-10"}></div> },
  { value: '3', label: <ImageCard src={Sorriso} alt={"Emoji"} height={100} width={100} />},
  { value: '4', label: <div className={"m-10"}></div>},
  { value: '5', label: <ImageCard src={Neutro} alt={"Emoji"} height={100} width={100} />},
  { value: '6', label: <div className={"m-10"}></div>},
  { value: '7', label: <ImageCard src={Triste} alt={"Emoji"} height={100} width={100} />},
  { value: '8', label: <div className={"m-10"}></div>},
  { value: '9', label: <ImageCard src={Deslike} alt={"Emoji"} height={100} width={100} />},
];

const MotivationProps: RadioItem[] = [
  { value: '1', label: <ImageCard src={Criativo} alt={"Talvez"} height={100} width={100} />},
  { value: '2', label: <div className={"m-10"}></div> },
  { value: '3', label: <ImageCard src={Radiante} alt={"Emoji"} height={100} width={100} />},
  { value: '4', label: <div className={"m-10"}></div>},
  { value: '5', label: <ImageCard src={Neutro} alt={"Emoji"} height={100} width={100} />},
  { value: '6', label: <div className={"m-10"}></div>},
  { value: '7', label: <ImageCard src={Entediado} alt={"Emoji"} height={100} width={100} />},
  { value: '8', label: <div className={"m-10"}></div>},
  { value: '9', label: <ImageCard src={Sono} alt={"Emoji"} height={100} width={100} />},
]

const WillPowerProps: RadioItem[] = [
  { value: '9', label: <ImageCard src={Inteligente} alt={"Emoji"} height={100} width={100} />},
  { value: '8', label: <div className={"m-10"}></div>},
  { value: '7', label: <ImageCard src={Sorriso} alt={"Emoji"} height={100} width={100} />},
  { value: '6', label: <div className={"m-10"}></div>},
  { value: '5', label: <ImageCard src={Neutro} alt={"Emoji"} height={100} width={100} />},
  { value: '4', label: <div className={"m-10"}></div>},
  { value: '3', label: <ImageCard src={Confuso} alt={"Emoji"} height={100} width={100} />},
  { value: '2', label: <div className={"m-10"}></div> },
  { value: '1', label: <ImageCard src={Frustrado} alt={"Talvez"} height={100} width={100} />},
];

const SamFormSchema = z.object({
  satisfaction: z.enum([SatisfactionProps[0].value, ...SatisfactionProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  motivation: z.enum([MotivationProps[0].value, ...MotivationProps.slice(0).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
  willpower: z.enum([WillPowerProps[0].value, ...WillPowerProps.slice(0).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
});

const SamForm = ({userId}) => {
  const form = useForm<z.infer<typeof SamFormSchema>>({
    resolver: zodResolver(SamFormSchema),
    defaultValues: {
      satisfaction: '',
      motivation: '',
      willpower: '',
  },});

  const { push } = useRouter();
  const onSubmit = async (values: z.infer<typeof SamFormSchema>) => {
    createForm(values, userId, "Sam").then(() => {
      push('/profile');
    })
  };

  return (
    <React.Suspense fallback={<LoadingComp label="Loading" />}>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <div className="flex flex-col flex-wrap justify-center gap-6">
          <h1 className="space-x-5 font-bold text-4xl self-center">Formulário SAM</h1>
          <FormField 
          control={form.control} 
          name="satisfaction" 
          render={({ field }) => (
            <FormItem className="space-x-5 content-center">
              <h5><b>Satisfação</b></h5>
              <FormControl>
                <RadioGroup
                onValueChange={field.onChange} 
                defaultValue={field.value} 
                value={field.value}
                className="flex flex-row space-x-1">
                  {SatisfactionProps.map((satisfaction, index) => (
                    <FormItem className="flex flex-col items-center space-x-3 space-y-0" key={index}>
                        <FormControl>
                          <RadioGroupItem value={satisfaction.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {satisfaction.label}
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
          <FormField 
          control={form.control} 
          name="motivation" 
          render={({ field }) => (
            <FormItem className="space-x-5">
              <h5><b>Motivação</b></h5>
              <FormControl>
                <RadioGroup 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                value={field.value}
                className="flex flex-row space-x-1">
                  {MotivationProps.map((motivation, index) => (
                      <FormItem className="flex flex-col items-center space-x-3 space-y-0" key={index}>
                        <FormControl>
                          <RadioGroupItem value={motivation.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {motivation.label}
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
          <FormField 
          control={form.control} 
          name="willpower" 
          render={({ field }) => (
            <FormItem className="space-x-5">
              <h5><b>Sentimento de Controle</b></h5>
              <FormControl>
                <RadioGroup 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                value={field.value}
                className="flex flex-row space-x-1">
                  {WillPowerProps.map((willpower, index) => (
                      <FormItem className="flex flex-col items-center space-x-3 space-y-0" key={index}>
                        <FormControl>
                          <RadioGroupItem value={willpower.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {willpower.label}
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
        </div>
        <div className="flex flex-row justify-around">
        <Button className="basis-1/12" type="reset" onClick={() => {form.reset()}
        }>
          Limpar
        </Button>
        <Button className='basis-1/12' type='submit'>
          Enviar
        </Button>
        </div>
      </form>
      </Form>
      </React.Suspense>
  )
}

export default SamForm