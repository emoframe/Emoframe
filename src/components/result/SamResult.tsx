'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Evaluation, Sam, samQuestions } from '@/types/forms';
import { User } from '@/types/users';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from 'react-hook-form';

const SamResult = ({ user, evaluation, data }: {
  user: User,
  evaluation: Evaluation,
  data: Sam
}) => {
  // Dados para o gráfico de linha
  const chartData = [
    ['Questão', 'Pontuação', { role: 'tooltip' }],
    ...samQuestions.map((q, index) => [
      `Q${index + 1}`, 
      parseInt(data[q.field as keyof Sam]), 
      `${q.label}\nValor: ${data[q.field as keyof Sam]}`
    ])
  ];

  // Configurações do gráfico de linha
  const chartOptions = {
    legend: { position: 'none' },
    hAxis: { title: 'Questões', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 1, maxValue: 9 },
    chartArea: { width: '80%', height: '70%' },
    tooltip: { isHtml: false },
    series: {
      0: { color: '#4CAF50' } // Cor da linha do gráfico
    }
  };

  // Criar um formulário fictício para renderização ilustrativa
  const form = useForm<Sam>({
    defaultValues: data,
    mode: 'onChange',
  });

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="font-bold text-4xl self-center">Resultado SAM</h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Informações do Usuário</h2>
        <p><b>Nome do Usuário:</b> {user.name} {user.surname}</p>
        <p><b>Data de Nascimento (idade):</b> {user.birthday?.toLocaleDateString()} ({new Date().getFullYear() - (user.birthday?.getFullYear() as number)} anos)</p>
        <p><b>E-mail:</b> {user.email}</p>
        <p><b>Telefone:</b> {user.phone}</p>
        <p><b>Avaliação:</b> {evaluation.identification}</p>
        <p><b>Data da Avaliação:</b> {evaluation.date.toString()}</p>
      </div>
      
      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Resultados</h2>

        <Charts chartType="LineChart" width="100%" height="400px" data={chartData} options={chartOptions} />
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Informações de Pontuação e Interpretação</h2>
        <p className="text-justify">
          A pontuação do SAM é baseada nas respostas a 3 questões que avaliam a satisfação, motivação e sentimento de controle. Cada questão tem uma pontuação de 1 a 9.
        </p>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Respostas do Usuário</h2>
        <Form {...form}>
          <div className="flex flex-col gap-6">
            {
              samQuestions.map((question) => (
                <React.Fragment key={question.index}>
                  <FormField 
                    control={form.control} 
                    name={question.field as keyof Sam}
                    render={({ field }) => (
                      <FormItem className="flex flex-col content-center">
                        <p className="text-xl mb-8"><b>{question.label}</b></p>
                        <FormControl>
                          <RadioGroup
                            onValueChange={() => {}} // vazio já que é apenas ilustrativo
                            defaultValue={field.value} 
                            className="flex flex-row content-center justify-between w-full">
                            {
                              question.options.map((option, index) => (
                                <FormItem className="flex flex-col items-center gap-4" key={index}>
                                  <FormControl>
                                    <RadioGroupItem value={option.value} checked={option.value === field.value} />
                                  </FormControl>
                                  <FormLabel>
                                    {option.label}
                                  </FormLabel>
                                </FormItem>  
                              ))
                            }
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Separator/>
                </React.Fragment>
              ))
            }
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SamResult;
