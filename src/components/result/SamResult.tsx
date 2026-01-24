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
  // Chart Data - Headers translated to English
  const chartData = [
    ['Question', 'Score', { role: 'tooltip' }],
    ...samQuestions.map((q, index) => [
      `Q${index + 1}`, 
      parseInt(data[q.field as keyof Sam]), 
      `${q.label}\nValue: ${data[q.field as keyof Sam]}`
    ])
  ];

  // Chart Options - Titles translated and responsive adjustments
  const chartOptions = {
    legend: { position: 'none' },
    hAxis: { title: 'Questions', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 1, maxValue: 9 },
    chartArea: { width: '80%', height: '70%' },
    tooltip: { isHtml: false },
    series: {
      0: { color: '#4CAF50' }
    }
  };

  const form = useForm<Sam>({
    defaultValues: data,
    mode: 'onChange',
  });

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 w-full max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl md:text-4xl self-center text-center">
        SAM Results
      </h1>
      
      <div className="flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-bold">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm md:text-base">
            <p><b>User Name:</b> {user.name} {user.surname}</p>
            <p><b>Date of Birth (age):</b> {user.birthday?.toLocaleDateString('en-US')} ({new Date().getFullYear() - (user.birthday?.getFullYear() as number)} years)</p>
            <p><b>E-mail:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone}</p>
            <p><b>Evaluation ID:</b> {evaluation.identification}</p>
            <p><b>Evaluation Date:</b> {evaluation.date.toString()}</p>
        </div>
      </div>
      
      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Results</h2>

        <div className="w-full overflow-hidden">
            <Charts 
                chartType="LineChart" 
                width="100%" 
                height="400px" 
                data={chartData} 
                options={chartOptions} 
            />
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Scoring and Interpretation</h2>
        <p className="text-justify text-sm md:text-base leading-relaxed">
          The SAM score is based on the answers to 3 questions that assess pleasure, arousal, and dominance. Each question is scored on a scale from 1 to 9.
        </p>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-bold">User Responses</h2>
        <Form {...form}>
          <div className="flex flex-col gap-8">
            {
              samQuestions.map((question) => (
                <React.Fragment key={question.index}>
                  <FormField 
                    control={form.control} 
                    name={question.field as keyof Sam}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <p className="text-lg md:text-xl mb-4 font-medium"><b>{question.label}</b></p>
                        <FormControl>
                          <RadioGroup
                            onValueChange={() => {}}
                            defaultValue={field.value} 
                            className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between w-full"
                          >
                            {
                              question.options.map((option, index) => (
                                <FormItem className="flex md:flex-col items-center gap-3 md:gap-2 p-2 border rounded-md md:border-none" key={index}>
                                  <FormControl>
                                    <RadioGroupItem value={option.value} checked={option.value === field.value} />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
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
                  <Separator className="hidden md:block"/> 
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