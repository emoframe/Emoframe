'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Evaluation, Gds, gdsQuestions } from '@/types/forms';
import { User } from '@/types/users';
import { boldify } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const GdsResult = ({ evaluation, answers }: {
    evaluation: Evaluation,
    answers: {
        user: User,
        data: Gds,
    }[],
}) => {
    const { t } = useTranslation('specialist_services_instruments_gds');

    // Função para calcular o escore somando os valores das respostas para cada item
    const calculateScore = (data) => {
        return gdsQuestions.reduce((acc, question) => {
            const response = data[question.field as keyof Gds];
            return acc + (response ? parseInt(response) : 0);
        }, 0);
    };

    // Função para determinar o nível de depressão com base na pontuação
    const determineDepressionLevel = (score) => {
        if (score <= 5) return 'Quadro psicológico normal';
        if (score <= 10) return 'Quadro de depressão leve';
        return 'Quadro de depressão severa';
    };

    // Dados para o gráfico de linha com variação entre 1 e -1
    const chartData = [
        [
            'Questão',
            ...answers.map(({ user }) => `${user.name} ${user.surname}`),
        ],
        ...gdsQuestions.map((q, index) => [
            `Q${index + 1}`,
            ...answers.map(({ data }) => (parseInt(data[q.field as keyof Gds]) === 1 ? 1 : -1) * (q.score === 'Affirmative' ? 1 : -1)),
        ])
    ];

    // Configurações do gráfico de linha
    const chartOptions = {
        legend: { position: 'none' },
        hAxis: { title: 'Questões', titleTextStyle: { color: '#333' } },
        vAxis: {
            title: 'Respostas',
            minValue: -1,
            maxValue: 1,
            ticks: [
                { v: -1, f: 'Não' },
                { v: 0, f: '' },
                { v: 1, f: 'Sim' }
            ]
        },
        chartArea: { width: '80%', height: '70%' },
        tooltip: { isHtml: false },
        series: {
            0: { color: '#4CAF50' }
        }
    };

    return (
        <div className="flex flex-col gap-8 p-8">
            <h1 className="font-bold text-4xl self-center">Resultado GDS</h1>
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
                        <TableRow>
                            <TableHead>Pontuação Total</TableHead>
                            {answers.map(({ data }, index) => (
                                <TableCell key={index}>{calculateScore(data)}</TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableHead>Nível de Depressão</TableHead>
                            {answers.map(({ data }, index) => (
                                <TableCell key={index}>{determineDepressionLevel(calculateScore(data))}</TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>

                <Charts chartType="LineChart" width="100%" height="400px" data={chartData} options={chartOptions} />
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Informações de Pontuação e Interpretação</h2>
                <p className="text-justify">
                    A pontuação da Escala de Depressão Geriátrica (GDS) é usada para identificar a presença de sintomas depressivos em idosos. A pontuação total é a soma das respostas afirmativas (Sim) para as perguntas indicadas.
                </p>
                <p className="text-justify">
                    <ul>
                        <li><b>0 a 5 pontos:</b> Quadro psicológico normal</li>
                        <li><b>6 a 10 pontos:</b> Quadro de depressão leve</li>
                        <li><b>11 a 15 pontos:</b> Quadro de depressão severa</li>
                    </ul>
                </p>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Respostas dos Usuários</h2>
                <div className='flex flex-col rounded-md border h-full'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pergunta</TableHead>
                                {answers.map(({ user }) => (
                                    <TableHead key={user.uid}>{user.name} {user.surname}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gdsQuestions.map((item) => (
                                <TableRow className="h-20" key={item.index}>
                                    <TableHead>{t(item.question)}</TableHead>
                                    {answers.map(({ data }, index) => (
                                        <TableCell key={index}>{['Não', 'Sim'][item.score === 'Affirmative' ? data[item.field] : +!+data[item.field]]}</TableCell>
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

export default GdsResult;
