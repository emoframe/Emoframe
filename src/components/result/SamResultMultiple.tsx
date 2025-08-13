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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const SamResult = ({ evaluation, answers }: {
    evaluation: Evaluation,
    answers: {
        user: User,
        data: Sam,
    }[],
}) => {
    // Dados para o gráfico de linha
    const chartData = [
        [
            'Questão',
            ...answers.map(({ user }) => `${user.name} ${user.surname}`),
        ],
        ...samQuestions.map((q, index) => [
            `Q${index + 1}`,
            ...answers.map(({ data }) => parseInt(data[q.field as keyof Sam])),
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

    return (
        <div className="flex flex-col gap-8 p-8">
            <h1 className="font-bold text-4xl self-center">Resultado SAM</h1>
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Informações dos Usuários</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome do Usuário</TableHead>
                            <TableHead>Data de Nascimento (idade)</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Avaliação</TableHead>
                            <TableHead>Data da Avaliação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {answers.map(({ user }) => (
                            <TableRow key={user.uid}>
                                <TableCell>{user.name} {user.surname}</TableCell>
                                <TableCell>{user.birthday?.toLocaleDateString()} ({new Date().getFullYear() - (user.birthday?.getFullYear() as number)} anos)</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{evaluation.identification}</TableCell>
                                <TableCell>{evaluation.date.toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
                <h2 className="text-2xl font-bold">Respostas dos Usuários</h2>
                <div className='flex flex-col rounded-md border h-full'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuário</TableHead>
                                {samQuestions.map(item => (
                                    <TableHead key={item.index}>{item.label}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {answers.map(({ user, data }) => (
                                <TableRow key={user.uid}>
                                    <TableHead>{user.name} {user.surname}</TableHead>
                                    {samQuestions.map(item => (
                                        <TableCell className='' key={item.index}>
                                            <div className='flex items-start'>
                                                <div className='flex flex-col items-center'>
                                                    {item.options.find(option => option.value === data[item.field as keyof Sam])?.label ?? ''}
                                                    {data[item.field as keyof Sam]}
                                                </div>
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default SamResult;
