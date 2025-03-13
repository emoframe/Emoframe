'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import Image from 'next/image';

const DefaultProps = {
    Affirmative: [{ value: '1', label: '1 = SIM' }, { value: '0', label: '0 = NÃO' }],
    Negative: [{ value: '0', label: '0 = SIM' }, { value: '1', label: '1 = NÃO' }],
};

const BooleanProps = [{value: '1', label: 'SIM'}, {value: '0', label: 'NÃO'}];

const PsychologicalFormSchema = z.object({
    cognitive: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(6),
    cognitive_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
    age: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(8),
    age_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
    depression: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(5),
    depression_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
});

const PagePsychologicalForm = ({onSubmit}) => {
    const form = useForm<z.infer<typeof PsychologicalFormSchema>>({
        resolver: zodResolver(PsychologicalFormSchema),
        defaultValues: {
            cognitive: ['', '', '', '', '', ''],
            cognitive_result: '',
            age: ['', '', '', '', '', '', '', ''],
            age_result: '',
            depression: ['', '', '', '', ''],
            depression_result: '',
        }
    });

    const calcResult = section => form.watch(section).reduce((acc, e) => acc + (e ? Number(e) : 0), 0);
    
    return (
        <Form {...form}>
            <form className='flex flex-col flex-wrap justify-center gap-8 mt-8' onSubmit={form.handleSubmit(onSubmit)}>
                <h1 className="font-bold text-4xl self-center"> DÉFICIT COGNITIVO </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='cognitive.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">1-O(A) senhor(a) considera que sua memória é tão boa quanto a de outras pessoas da sua idade?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='cognitive.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">2-Memória: Vou lhe dizer 3 palavras e o(a) senhor(a) irá repeti-las em seguida. Peço que memorize essas 3 palavras, pois vou lhe perguntar sobre elas mais tarde novamente. <b>[Instruções: Falar as 3 palavras em sequência pausadamente. Caso o(a) idoso(a) não consiga, repita no máximo 3 vezes para aprendizado. Pontuar ao lado se o(a) idoso(a) repetiu corretamente as três palavras na primeira tentativa]</b></p>
                            <div className="flex flex-col gap-3 items-start">
                                {['Carro', 'Vaso', 'Tijolo'].map((word, index) => (
                                    <div key={index} className="flex flex-row items-center gap-3">
                                        <Checkbox />
                                        <label className="font-bold">{word}</label>
                                    </div>
                                ))}
                            </div>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='cognitive.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">3-Linguagem, função executiva e atenção: Agora, eu vou marcar um minuto no relógio e durante esse tempo o(a) senhor(a) deve falar o maior número de animais de que se lembrar. Quanto mais animais o senhor fala nesse tempo melhor. <b>[Instruções: Anote os nomes de animais falados pelo(a) idoso(a) a cada 15 segundos, e registrar, mas não contar animais repetidos]. Pode começar. Pontuação de acordo com escolaridade: 1) analfabetos = 9 animais; 2) 1-7 anos = 12 animais e 3) 8 anos ou mais = 13 animais.]</b></p>
                            <div className="flex flex-col gap-3 w-full">
                                {['/images/time1.png', '/images/time2.png', '/images/time3.png', '/images/time4.png'].map((time, index) => (
                                    <div key={index} className='flex gap-3'>
                                        <Image src={time} alt="" width="100" height="100" className="font-bold flex-grow-0 rounded-full"/>
                                        <Textarea className='flex-grow' />
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <label className="text-nowrap">Pontuação total</label>
                                <Input type="number" />
                            </div>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='cognitive.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">4-Teste do relógio: Aplique apenas se o (a) idoso tiver escolaridade igual ou superior a 5 anos. Caso não, pontue ao lado de forma negativa. Esteja com uma folha com um desenho de um círculo de 11 cm de diâmetro e dê as instruções para a tarefa: “Senhor(a), nesta folha temos um mostrador de um relógio. Gostaria que o senhor(a) colocasse os números dentro dele. [Aguardar]. Por favor, agora indique o horário 11h10 (onze horas e 10 minutos).”<b>[Instruções: Analise o desenho e pontue ao lado se o(a) idoso(a) atingiu a nota de corte esperada. Nota de corte: Atribua um ponto para cada posicionamento correto dos números 1, 2, 4, 5, 7, 8, 10 e 11, mais um ponto para cada ponteiro correto (pontuação máxima = 10). Nota de corte = 7].</b></p>
                            <div className="flex flex-col gap-3 items-start">
                                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map((number, index) => (
                                    <div key={index} className="flex flex-row items-center gap-3">
                                        <Checkbox />
                                        <label className="font-bold">{number}</label>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col items-start gap-3'>
                                <div className="flex flex-row items-center gap-3">
                                    <Checkbox />
                                    <label>Ponteiro correto na hora</label>
                                </div>
                                <div className="flex flex-row items-center gap-3">
                                    <Checkbox />
                                    <label>Ponteiro correto nos minutos</label>
                                </div>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <label className="text-nowrap">Pontuação total</label>
                                <Input type="number" />
                            </div>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='cognitive.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">5-Praxia: Esteja com uma folha em mãos e fale todos os comandos de uma vez só: “Pegue este papel com a mão direita. Dobre-o ao meio e coloque-o sobre a mesa”. <b>[Instruções: Pontue se o(a) idoso(a) realizou os 3 comandos corretamente]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='cognitive.5'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">6-Memória tardia: O(a) senhor(a) consegue se lembrar das 3 palavras que lhe pedi que repetisse agora há pouco?<b>[Instruções: o entrevistador não deve dizer as palavras. Pontue se o(a) idoso(a) lembrou e repetiu corretamente as 3 palavras].</b></p>
                            <div className="flex flex-col gap-3 items-start">
                                {['Carro', 'Vaso', 'Tijolo'].map((word, index) => (
                                    <div key={index} className="flex flex-row items-center gap-3">
                                        <Checkbox />
                                        <label className="font-bold">{word}</label>
                                    </div>
                                ))}
                            </div>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='cognitive_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 6): {calcResult('cognitive')}</p>
                            <p className="text-xl">Necessita de investigação?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {BooleanProps.map((prop, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={prop.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {prop.label}
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
                <h1 className="font-bold text-4xl self-center"> ATITUDE NEGATIVA EM RELAÇÃO AO ENVELHECIMENTO </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='age.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">7-De maneira geral, o(a) senhor(a) diria que a sua saúde é boa?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='age.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">8 -Que idade o (a) senhor(a) sente ter? Por quê?</p>
                            <p className="text-xl"><b>[Instruções: Com base na resposta dada, analisar e registrar ao lado se o(a) idoso(a) sente-se mais velho do que realmente é.]</b></p>
                            <Textarea />
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='age.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">9-Ao pensar no seu envelhecimento o(a) senhor(a) se sente preocupado(a)?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='age.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">10-O(a) senhor(a) acha que a velhice, de forma geral, tem mais pontos negativos do que positivos?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='age.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">11-O(a) senhor(a) acha que é possível ter uma vida sexual saudável na velhice?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='age.5'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">12-O(a) senhor(a) acha que há poucas coisas que uma pessoa possa realizar na velhice?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='age.6'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">13-O(a) senhor(a) acha que a velhice é sinônimo de debilidade física?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='age.7'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">14-O(a) senhor(a) acha que é melhor morrer cedo do que ficar velho(a)?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='age_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 8): {calcResult('age')}</p>
                            <p className="text-xl">Necessita de investigação?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {BooleanProps.map((prop, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={prop.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {prop.label}
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
                <h1 className="font-bold text-4xl self-center"> DEPRESSÃO </h1>
                <Separator className="my-4" />
                <h2 className="text-2xl self-center"> <b>Instruções: </b>Antes de iniciar diga ao idoso: 'Vou lhe fazer algumas perguntas para saber como o(a) senhor(a) vem se sentindo na última semana.'</h2>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='depression.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">15-De modo geral o(a) senhor(a) está satisfeito com a vida?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Affirmative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='depression.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">16-O(a) senhor (a) se sente triste com frequência?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='depression.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">17-O(a) senhor(a) abandonou muitas das coisas que fazia ou gostava de fazer?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='depression.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">18-O(a) senhor(a) tem medo de que algo ruim lhe aconteça?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='depression.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">19-O(a) Sr.(a) se sente impaciente e agitado(a) com frequência?                            </p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {DefaultProps.Negative.map((defaultProp, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
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
                <FormField
                    control={form.control}
                    name='depression_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 5): {calcResult('depression')}</p>
                            <p className="text-xl">Necessita de investigação?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                    className="flex flex-col justify-between">
                                    {BooleanProps.map((prop, index) => (
                                        <FormItem className="flex flex-row gap-x-2 items-center" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={prop.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-md">
                                                {prop.label}
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
                <Button className='w-full mt-6' type='submit'>
                    Próximo
                </Button>
            </form>
        </Form>
    );
}

export default PagePsychologicalForm;
