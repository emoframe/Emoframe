'use client';

import React, { useEffect, useState } from 'react';
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
import { chunk } from '@/lib/utils';
import { FillEvaluationForm, gdsQuestions } from '@/types/forms';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const DefaultProps = {
    Affirmative: [{ value: '1', label: 'Sim' }, { value: '0', label: 'Não' }],
    Negative: [{ value: '0', label: 'Sim' }, { value: '1', label: 'Não' }],
};

const GdsFormSchema = z.object(
    Object.fromEntries(
        gdsQuestions.map(item => [
            item.field,
            z.enum(
                [DefaultProps[item.score][0].value, DefaultProps[item.score][1].value],
                { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
            )
        ])
    )
);

// Dividir gdsQuestions em 2 partes
const gdsQuestionsChunks = chunk(gdsQuestions, Math.ceil(gdsQuestions.length / 2));

// Gerar steps com 2 partes
const steps: StepConfig[] = gdsQuestionsChunks.map((_, index) => ({ label: `Passo ${index + 1}` }));

const GdsForm = (params: FillEvaluationForm) => {
    const FormSchema = !("isViewable" in params) ? GdsFormSchema : z.object({});
    const form = useForm<z.infer<typeof GdsFormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            satisfied: '',
            no_activities: '',
            empty: '',
            upset: '',
            good: '',
            bad: '',
            happy: '',
            helpless: '',
            stay_at_home: '',
            problems_of_memory: '',
            wonderful_to_stay_alive: '',
            useless: '',
            full_of_energy: '',
            hopeless: '',
            unlucky: '',
        }
    });

    const { push } = useRouter();
    const { toast } = useToast();
    const onSubmit = async (values: z.infer<typeof GdsFormSchema>) => {
        if (!("isViewable" in params)) {
            saveAnswer(values, params.evaluationId, params.userId).then(() => {
                toast({
                    title: "Solicitação aprovada",
                    description: "Avaliação preenchida e salva",
                });
                push('/user/evaluations');
            });
        }
    }

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    });

    return (
        <div className='px-8'>
            <Steps activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step index={index} key={index} additionalClassName={{ label: "text-md" }} {...step} />
                ))}
            </Steps>

            <div className="flex flex-col flex-wrap justify-center gap-8 mt-8">
                <h1 className="font-bold text-4xl self-center"> ESCALA DE DEPRESSÃO GERIÁTRICA - GDS </h1>
                <h2 className="text-md self-center"> Aplicar o questionário computando as respostas que indicam como a pessoa tem se sentido na última semana.</h2>
                <h2 className="text-md self-center"> Assinalar SIM ou NÃO. Cada resposta deverá ser pontuada conforme o indicativo ao lado. O resultado final será a soma das 15 respostas.</h2>
                <Separator className="my-4" />
                <React.Suspense key={activeStep} fallback={<Progress />}>
                    <Form key={activeStep} {...form}>
                        <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)}>
                            {
                                gdsQuestionsChunks[activeStep].map((question, index) => (
                                    <React.Fragment key={question.field}>
                                        <FormField
                                            control={form.control}
                                            name={question.field}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col items-center gap-5 content-center">
                                                    <p className="text-xl"><b>{question.question}</b></p>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            value={field.value}
                                                            className="flex flex-row justify-between">
                                                            {DefaultProps[question.score].map((defaultProp, index) => (
                                                                <FormItem className="flex flex-col gap-y-2 items-center" key={index}>
                                                                    <FormControl>
                                                                        <RadioGroupItem value={defaultProp.value} />
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
                                            )}
                                        />
                                        <Separator className="mb-8" />
                                    </React.Fragment>
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
                                    gdsQuestionsChunks[activeStep].map((question, index) => (form.setValue(question.field, '')));
                                    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
                                }}>Limpar</Button>

                                { 
                                    (activeStep != 1) ?
                                        <Button className="basis-1/8 text-lg" type="button" size="lg" onClick={() => {
                                            const values = form.getValues(gdsQuestionsChunks[activeStep].map((question, index) => (question.field)));
                                            const hasNull = !("isViewable" in params) ? Object.values(values).some((value) => value === "") : false;
                                            
                                            if (hasNull) {
                                                toast({
                                                    title: "Solicitação negada",
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

export default GdsForm;
