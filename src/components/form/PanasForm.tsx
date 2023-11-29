'use client';

import React from 'react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '../ui/form';
import { 
    Card, 
    CardHeader, 
    CardFooter, 
    CardTitle, 
    CardDescription, 
    CardContent 
} from '@/components/ui/card';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createForm } from '@/lib/firebase'; 
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { StepperComp, Step } from '@/components/ui/stepper';
import { useSteps } from '@chakra-ui/react';
import { LoadingComp } from "@/components/ui/loading";

interface RadioItem {
    value: string;
    label: string;
}

const DefaultProps: RadioItem[] = [
    {value: '1', label: '1 (Nada ou muito ligeiramente)'},
    {value: '2', label: '2 (Um pouco)'},
    {value: '3', label: '3 (Moderadamente)'},
    {value: '4', label: '4 (Bastante)'},
    {value: '5', label: '5 (Extremamente)'},
]

const StepProps: Step[] = [
    {title: 'Parte 1', description: 'Teste 1'},
    {title: 'Parte 2', description: 'Teste 2'},
]

const PanasFormSchema = z.object({
    repulsion: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    tormented: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    scared: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    hearty: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    horny: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    guilty: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    enthusiastic: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    pleasantly_surprised: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    disturbed: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    trembling: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    active: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    proud: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    inspired: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    nervous: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    angry: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    determined: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    charmed: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    remorse: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    frightened: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
    interested: z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {errorMap : (issue, ctx) => ({message: "Escolha uma opção"})}),
})

const PanasForm = ({userId}) => {
    const form = useForm<z.infer<typeof PanasFormSchema>>({
        resolver: zodResolver(PanasFormSchema),
        defaultValues: {
            repulsion: '',
            tormented: '',
            scared: '',
            hearty: '',
            horny: '',
            guilty: '',
            enthusiastic: '',
            pleasantly_surprised: '',
            disturbed: '',
            trembling: '',
            active: '',
            proud: '',
            inspired: '',
            nervous: '',
            angry: '',
            determined: '',
            charmed: '',
            remorse: '',
            frightened: '',
            interested: '',
        }
    });

    const { push } = useRouter();

    const onSubmit = async (values: z.infer<typeof PanasFormSchema>) => {
        createForm(values, userId, "Panas").then(() => {push('/profile')})     
    }

    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: StepProps.length,
    })

    switch (activeStep) {
        case 0: 
            return (
            <React.Suspense fallback={<LoadingComp label="Loading" />}>
            <Form key={activeStep} {...form}>
                <StepperComp steps={StepProps} activestep={activeStep} colorScheme="gray" />
                <form key={activeStep}>
                    <div className="flex flex-col flex-wrap justify-center gap-8">
                        <h1 className="font-bold text-4xl self-center"> PANAS </h1>
                        <h2 className="text-2xl self-center"> Esta escala consiste num conjunto de palavras que descrevem diferentes sentimentos e emoções. Leia cada palavra e marque a resposta adequada a palavra. Veja a escala e exemplos de preenchimento abaixo: </h2>
                        <div className="flex flex-row justify-around">
                            <Button className="basis-full" type="button">Exemplos</Button>
                        </div>
                        <div>
                            <hr className="text-black bg-slate-300 h-0.5"/>
                        </div>
                        <h2 className="text-2xl self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>
                        <FormField
                        control={form.control}
                        name="enthusiastic"
                        render={({field}) => (
                        <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>ENTUSIASMADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((repulsion, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={repulsion.value}/> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {repulsion.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>)
                            }
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="hearty"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>CALOROSO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((hearty, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={hearty.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {hearty.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="scared"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>ASSUSTADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((scared, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={scared.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {scared.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="repulsion"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>REPULSO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((repulsion, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={repulsion.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {repulsion.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="horny"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>EXCITADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((horny, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={horny.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {horny.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="guilty"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>CULPADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((guilty, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={guilty.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {guilty.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="pleasantly_surprised"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>AGRADAVELMENTE SURPEENDIDO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((pleasantly_surprised, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={pleasantly_surprised.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {pleasantly_surprised.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="disturbed"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>PERTURBADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((disturbed, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={disturbed.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {disturbed.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="tormented"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>ATORMENTADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((tormented, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={tormented.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {tormented.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="interested"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>INTERESSADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((interested, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={interested.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {interested.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex flex-row justify-around mt-8">
                            <Button className="basis-1/8 text-lg" type='button' onClick={() => {form.reset()}}>Limpar</Button>
                            <Button className="basis-1/8 text-lg" type="button" onClick={() => {goToNext();}}>Próximo</Button>
                        </div>
                    </div>
                </form>
            </Form>
            </React.Suspense>
        )
        case 1:
            return (
            <React.Suspense fallback={<LoadingComp label="Loading" />}>
            <Form key={activeStep} {...form}>
                <StepperComp steps={StepProps} activestep={activeStep} colorScheme="gray" />
                <form key={activeStep} onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col flex-wrap justify-center gap-8">
                        <h1 className="font-bold text-4xl self-center"> PANAS </h1>
                        <h2 className="text-2xl self-center"> Esta escala consiste num conjunto de palavras que descrevem diferentes sentimentos e emoções. Leia cada palavra e marque a resposta adequada a palavra. Veja a escala e exemplos de preenchimento abaixo: </h2>
                        <div className="flex flex-row justify-around">
                            <Button className="basis-full" type="button">Exemplos</Button>
                        </div>
                        <div>
                            <hr className="text-black bg-slate-300 h-0.5"/>
                        </div>
                        <h2 className="text-2xl self-center"> Indique em que medida está sentindo cada uma das emoções AGORA: </h2>
                        <FormField
                        control={form.control}
                        name="nervous"
                        render={({field}) => (
                        <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>NERVOSO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((nervous, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={nervous.value}/> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {nervous.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>)
                            }
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="proud"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>ORGULHOSO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((proud, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={proud.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {proud.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="inspired"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>INSPIRADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((inspired, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={inspired.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {inspired.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="trembling"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>TRÊMULO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((trembling, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={trembling.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {trembling.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="determined"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>DETERMINADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((determined, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={determined.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {determined.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="remorse"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>REMORSO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((remorse, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={remorse.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {remorse.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="frightened"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>AMEDRONTADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((frightened, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={frightened.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {frightened.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="active"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>ATIVO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((active, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={active.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {active.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="charmed"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>ENCANTADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((charmed, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={charmed.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {charmed.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <hr className="text-black bg-black h-0.5"/>
                        </div>
                        <FormField
                        control={form.control}
                        name="angry"
                        render={({field}) => (
                            <FormItem className="space-x-5 space-y-5 content-center">
                                <FormLabel className="text-2xl">Estou me sentindo <b>IRRITADO(A)</b>.</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-row space-x-5 justify-between">
                                        {DefaultProps.map((angry, index) => (
                                            <FormItem className="flex flex-col items-center space-y-2" key={index}>
                                                <FormControl>
                                                    <RadioGroupItem value={angry.value} /> 
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {angry.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex flex-row justify-around mt-8">
                            <Button className="basis-1/8 text-lg" type="button" onClick={() => {goToPrevious();}}>Anterior</Button>
                            <Button className="basis-1/8 text-lg" type='button' onClick={() => {form.reset(); goToPrevious();}}>Limpar</Button>
                            <Button className="basis-1/8 text-lg" type="submit">Enviar</Button>
                        </div>
                    </div>
                </form>
            </Form>
            </React.Suspense>
        )
    }
}

export default PanasForm