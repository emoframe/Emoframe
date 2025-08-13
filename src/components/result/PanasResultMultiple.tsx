'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Evaluation, Panas, panasQuestions } from '@/types/forms';
import { erf } from 'mathjs';
import { User } from '@/types/users';
import { useTranslation } from 'react-i18next';

const PanasResult = ({ evaluation, answers }: {
    evaluation: Evaluation,
    answers: {
        user: User,
        data: Panas,
    }[],
}) => {
    const { t } = useTranslation('specialist_services_instruments_panas');

    // Função para calcular o escore somando os valores das respostas para cada item
    const calculateScore = (type: string, data: Panas) => {
        return panasQuestions
            .filter(item => item.type === type)
            .reduce((acc, item) => {
                const response = data[item.field as keyof Panas];
                return acc + (response ? parseInt(response) : 0);
            }, 0);
    };

    // Função para calcular percentil baseado na distribuição normal
    const calculatePercentile = (score: number, mean: number, sd: number) => {
        const z = (score - mean) / sd;
        const percentile = Math.round((1 - (0.5 * (1 + erf(z / Math.sqrt(2))))) * 100);
        return percentile;
    };

    // Valores assumidos com base em dados normativos típicos
    const meanPositive = 29.7; // Média dos escores de Afeto Positivo
    const sdPositive = 7.9; // Desvio padrão dos escores de Afeto Positivo
    const meanNegative = 14.8; // Média dos escores de Afeto Negativo
    const sdNegative = 5.4; // Desvio padrão dos escores de Afeto Negativo

    // Cálculo dos percentis com base nos escores e nos dados normativos

    // Dados para o gráfico de barras
    // const chartData = [
    //   ['Tipo de Afeto', 'Pontuação', { role: 'style' }],
    //   ['Afeto Positivo', positiveAffectScore, '#4CAF50'],
    //   ['Afeto Negativo', negativeAffectScore, '#F44336']
    // ];

    // Configurações do gráfico
    const chartOptions = {
        legend: { position: 'none' },
        hAxis: {
            minValue: 0,
            maxValue: 50 // Ajuste o valor máximo conforme necessário
        }
    };

    return (
        <div className="flex flex-col gap-8 p-8">
            <h1 className="font-bold text-4xl self-center">Resultado PANAS</h1>
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
                            <TableHead>Escore de Afeto Positivo (10-50)</TableHead>
                            {answers.map(({ data }, index) => (
                                <TableCell key={index}>{calculateScore('positive', data)}</TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableHead>Percentil Normativo</TableHead>
                            {answers.map(({ data }, index) => (
                                <TableCell key={index}>{calculatePercentile(calculateScore('positive', data), meanPositive, sdPositive)}</TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableHead>Escore de Afeto Negativo (10-50)</TableHead>
                            {answers.map(({ data }, index) => (
                                <TableCell key={index}>{calculateScore('negative', data)}</TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableHead>Percentil Normativo</TableHead>
                            {answers.map(({ data }, index) => (
                                <TableCell key={index}>{calculatePercentile(calculateScore('negative', data), meanNegative, sdNegative)}</TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
                {/* <Charts chartType="ColumnChart" width="100%" height="400px" data={chartData} options={chartOptions} /> */}
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Informações de Pontuação e Interpretação</h2>
                <p className="text-justify">
                    A pontuação do PANAS é separada em escores de Afeto Positivo (PA) e Afeto Negativo (NA), com uma pontuação mais alta indicando mais afeto positivo ou negativo, respectivamente.
                </p>
                <p className="text-justify">
                    Embora uma pontuação muito alta na escala de PA mereça atenção (ou seja, pacientes maníacos geralmente pontuam muito alto em PA), a principal preocupação clínica será com pacientes que mostram níveis muito baixos de afeto positivo (ou seja, são anedônicos) e, portanto, obtêm baixas classificações percentuais.
                    Em contraste, uma pontuação alta no NA (e um percentil alto) é um indicador de sofrimento psicológico.
                </p>
                <p className="text-justify">
                    Os dados normativos foram coletados de mais de 1.000 adultos australianos e são usados para calcular percentis. Uma classificação percentil de 50 indica um nível médio de afetividade positiva ou negativa em comparação com o grupo normativo.
                </p>
                <p className="text-justify">
                    Existem duas subescalas do PANAS:
                    <ul>
                        <li><b>Afeto Positivo (itens 1, 3, 5, 9, 10, 12, 14, 16, 17 e 19):</b> Pontuações mais altas representam níveis mais altos de PA e estão associadas ao engajamento prazeroso com o ambiente.</li>
                        <li><b>Afeto Negativo (itens 2, 4, 6, 7, 8, 11, 13, 15, 18 e 20):</b> Pontuações mais altas representam níveis mais altos de NA e refletem uma dimensão de sofrimento geral, resumindo uma variedade de estados negativos, como raiva, culpa ou ansiedade.</li>
                    </ul>
                </p>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Respostas dos Usuários</h2>
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
                        {panasQuestions.map((item) => (
                            <TableRow className="h-20" key={item.index}>
                                <TableCell className="text-white text-md border-white border-2" style={{ backgroundColor: (item.type == 'positive') ? '#4CAF50' : '#F44336' }}>{t(item.question)}</TableCell>
                                {answers.map(({ data }, index) => (
                                    <TableCell key={index}>{data[item.field]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PanasResult;