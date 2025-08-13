'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Evaluation, Leap, leapQuestions } from '@/types/forms';
import { User } from '@/types/users';

const LeapResult = ({ evaluation, answers }: {
    evaluation: Evaluation,
    answers: {
        user: User,
        data: Leap,
    }[],
}) => {

    // Função para calcular o valor de cada fator
    const calculateFactor = (factorName: string, data: Leap) => {
        // Filtra as questões correspondentes ao fator
        const factorQuestions = leapQuestions.filter(factor => factor.factor === factorName);
        // Calcula a soma das respostas para as questões do fator
        const sum = factorQuestions.reduce((acc, factor) => {
            const response = data[factor.field as keyof Leap];
            return acc + (response ? parseInt(response) : 0);
        }, 0);
        // Retorna a média normalizada (entre 0 e 1)
        return (sum / factorQuestions.length) / 5;
    };

    // Calculando os valores dos fatores
    const uniqueFactors = [...new Set(leapQuestions.map(factor => factor.factor))];

    // Dados para o gráfico de barras
    // const chartData = [
    //   ['Fator', 'Valor', { role: 'style' }],
    //   ...factorValues.map(factor => [factor.name, factor.value, '#4CAF50'])
    // ];

    // Configurações do gráfico
    const chartOptions = {
        legend: { position: 'none' },
        hAxis: {
            minValue: 0,
            maxValue: 1
        }
    };

    return (
        <div className="flex flex-col gap-8 p-8">
            <h1 className="font-bold text-4xl self-center">Resultado LEAP</h1>
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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            {answers.map(({ user }) => (
                                <TableHead key={user.uid}>{user.name} {user.surname}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {uniqueFactors.map(factor => (
                            <TableRow key={factor}>
                                <TableCell className="text-md font-bold">{factor}</TableCell>
                                {answers.map(({ data }, index) => (
                                    <TableCell key={index}>{calculateFactor(factor, data).toFixed(2)}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <Charts chartType="ColumnChart" width="100%" height="400px" data={chartData} options={chartOptions} /> */}
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Nível de Presença</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/2 text-lg font-bold border-r-2">Nível de Presença</TableHead>
                            <TableHead className="w-1/2 text-lg font-bold">Valor de Referência</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-md border-r-2">Baixo</TableCell>
                            <TableCell className="text-md">Entre 0 e 0,3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-md border-r-2">Médio</TableCell>
                            <TableCell className="text-md">Entre 0,3 e 0,7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-md border-r-2">Alto</TableCell>
                            <TableCell className="text-md">Acima de 0,7</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Informações de Pontuação e Interpretação</h2>
                <p className="text-justify">
                    A pontuação do LEAP é calculada com base em fatores específicos, cada um representando diferentes aspectos das emoções e sentimentos dos respondentes. Cada fator é calculado como a média das respostas para as questões correspondentes, normalizada para um valor entre 0 e 1.
                </p>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Respostas dos Usuários</h2>
                <div className='flex flex-col rounded-md border h-full'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sentimento</TableHead>
                                {answers.map(({ user }) => (
                                    <TableHead key={user.uid}>{user.name} {user.surname}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leapQuestions.map((factor) => (
                                <TableRow className="h-20" key={factor.index}>
                                    <TableHead>{factor.question}</TableHead>
                                    {answers.map(({ data }, index) => (
                                        <TableCell key={index}>{data[factor.field]}</TableCell>
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

export default LeapResult;
