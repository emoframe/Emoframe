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
import { Separator } from '@/components/ui/separator';;
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';

type Data = {
    age: string,
    gender: string,
    question_6: string,
    functional: string[],
    question_20: string,
    environment: string[],
    question_42: string,
    question_44: {
        checks: string[],
        other: string,
    },
    question_46: string,

}

const DefaultProps = {
    Affirmative: [{ value: '1', label: '1 = SIM' }, { value: '0', label: '0 = NÃO' }],
    Negative: [{ value: '0', label: '0 = SIM' }, { value: '1', label: '1 = NÃO' }],
    Neutral: [{ value: '0', label: '0 = SIM' }, { value: '0', label: '0 = NÃO' }],
};

const BooleanProps = [{value: '1', label: 'SIM'}, {value: '0', label: 'NÃO'}];

const MultidimensionalFormSchema = z.object({
    falls_90: z.string(),
    falls: z.enum(
        [DefaultProps.Affirmative[0].value, DefaultProps.Affirmative[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ).array().length(16),
    falls_result: z.enum(
        [BooleanProps[0].value, BooleanProps[1].value],
        { errorMap: (issue, ctx) => ({ message: "Escolha uma opção" }) }
    ),
    multidimensional_note: z.string().optional(),
});

const PageMultidimensionalForm = ({onSubmit, data, prevStep}: {onSubmit: any, data: Data, prevStep: () => void}) => {
    const form = useForm<z.infer<typeof MultidimensionalFormSchema>>({
        resolver: zodResolver(MultidimensionalFormSchema),
        defaultValues: {
            falls_90: '',
            falls: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            falls_result: '',
            multidimensional_note: '',
        }
    });

    const calcResult = section => form.watch(section).reduce((acc, e) => acc + (e ? Number(e) : 0), 0);
    
    return (
        <Form {...form}>
            <form className='flex flex-col flex-wrap justify-center gap-8 mt-8' onSubmit={form.handleSubmit(onSubmit)}>
                <h1 className="font-bold text-4xl self-center"> QUEDAS </h1>
                <Separator className="my-4" />
                <FormField
                    control={form.control}
                    name='falls.0'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">88 -O(a) senhor(a) sofreu alguma queda nos últimos 12 meses? Se sim, quantas?</p>
                            <Input type='number' className='w-auto' />
                            <p className="text-xl"><b>[Instruções: Se não, pontue também a resposta “não” na próxima questão e vá para a questão 91.]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.1'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">89 -O(a) senhor(a) sofreu alguma fratura decorrente destas quedas ? Se sim, quais?</p>
                            <Input type='number' className='w-auto' />
                            <p className="text-xl"><b>[Investigar atividade realizada, local, horário do dia, tipo de calçado, riscos ambientais etc]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls_90'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">90-O que o (a) senhor(a) estava fazendo quando sofreu essa(s) queda(s)?</p>
                            <FormControl>
                                <Textarea onChange={event => form.setValue('falls_90', event.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <FormField
                    control={form.control}
                    name='falls.2'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">91-Avaliação de força de MMII.<b>[Instruções: Utilizando uma cadeira de assento e encosto firmes, sem braços, peça ao(a) idoso(a) para levantar-se de uma cadeira sem ajuda. Assinale ao lado se o(a) idoso(a) conseguiu realizar a tarefa.]</b></p>
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
                    name='falls.3'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">92-Avaliação de equilíbrio.<b>[Instruções: Peça ao(a) idoso(a) para permanecer em pé em uma única perna, sem apoio dos membros superiores, durante 5 segundos. Oriente retornar o pé no chão em caso de perda de equilíbrio. Assinale ao lado se o(a) idoso(a) conseguiu realizar a tarefa.]</b></p>
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
                    name='falls.4'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">93-O(a) senhor(a) faz uso de dispositivo de auxílio à marcha (bengala, andador) sem orientação profissional?</p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.5'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">94-Idade &gt; 75 anos<b>[Instruções: Ver em dados de identificação]</b></p>
                            <p className="text-xl"><b>Idade = {data.age}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.6'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">95-Gênero feminino<b>[Instruções: Ver em dados de identificação]</b></p>
                            <p className="text-xl"><b>Genero = {data.gender}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.7'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">96-Alterações cognitivas<b>[Instruções: Pontuação negativa Teste do Relógio (questão 6)]. Se 'Pontuou' o idoso atingiu a nota de corte esperada.</b></p>
                            <p className="text-xl"><b>{(data.question_6 === '1') ? 'Pontuou' : 'Não Pontuou'}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.8'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">97-Comprometimento AVDs<b>[Instruções: Pontuação &lt; 4 em Incapacidade Funcional]</b></p>
                            <p className="text-xl"><b>Pontuação = {data.functional.reduce((acc, e) => acc + (e ? Number(e) : 0), 0)}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.9'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">98-Déficit visual<b>[Instruções: ver questão 20]. Se 'Pontuou' o idoso não tem dificuldade para enxergar.</b></p>
                            <p className="text-xl"><b>{(data.question_20 === '1') ? 'Pontuou' : 'Não Pontuou'}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.10'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">99-Riscos domésticos<b>[Instruções: ver questões 72 a 78]</b></p>
                            <p className="text-xl"><b>Pontuação = {data.environment.slice(0, 7).reduce((acc, e) => acc + (e ? Number(e) : 0), 0)}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.11'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">100-Riscos comportamentais<b>[Instruções: ver questões 79 a 81]</b></p>
                            <p className="text-xl"><b>Pontuação = {data.environment.slice(7, 10).reduce((acc, e) => acc + (e ? Number(e) : 0), 0)}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.12'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">101-Inatividade<b>[Instruções: ver questão 42]. Se 'Pontuou' o idoso pratica exercicío regularmente.</b></p>
                            <p className="text-xl"><b>{(data.question_42 === '1') ? 'Pontuou' : 'Não Pontuou'}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.13'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">102-Acidente Vascular Encefálico prévio<b>[Instruções: ver questão 44]</b></p>
                            <p className="text-xl"><b>Pontuação = {(data.question_44.checks[2] === 'on') ? 'sim' : 'não'}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.14'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">103-Faz uso de medicações psicotrópicas, em especial benzodiazepínicos, ou uso continuo de 5 ou mais medicações (polifarmacia)<b>[Instruções: ver questão 46.] Se 'Pontuou' há presença de polifarmácia.</b></p>
                            <p className="text-xl"><b>{(data.question_46 === '1') ? 'Pontuou' : 'Não Pontuou'}</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls.15'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">104-Apresenta alguma das doenças a seguir: hipertensão, tontura/ vertigem, Parkinson, amputação de membros inferiores, convulsões, artrite, osteoporose, incontinência, diabetes, neuropatia, hipotensão postural<b>[Instruções: ver questões 44 e 45]</b></p>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(field.onChange)}
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
                    name='falls_result'
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center gap-5 content-center">
                            <p className="text-xl">Pontuação (máxima = 16): {calcResult('falls')}</p>
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
                <FormField
                    control={form.control}
                    name='multidimensional_note'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Anotações</FormLabel>
                            <FormControl>
                                <Textarea {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator className="mb-8" />
                <div className='flex flex-row gap-4'>
                    <Button className='w-full mt-6' type='button' onClick={prevStep}>
                        Anterior
                    </Button>
                    <Button className='w-full mt-6' type='submit' onClick={() => console.log(data)}>
                        Finalizar
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default PageMultidimensionalForm;
