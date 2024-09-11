'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Evaluation, Gds, gdsQuestions } from '@/types/forms';
import { User } from '@/types/users';
import { boldify } from '@/lib/utils';

const GdsResult = ({ user, evaluation, data }: {
  user: User,
  evaluation: Evaluation,
  data: Gds
}) => {

  // Função para calcular o escore somando os valores das respostas para cada item
  const calculateScore = (questions) => {
    return questions.reduce((acc, question) => {
      const response = data[question.field as keyof Gds];
      return acc + (response ? parseInt(response) : 0);
    }, 0);
  };

  const totalScore = calculateScore(gdsQuestions);

  // Função para determinar o nível de depressão com base na pontuação
  const determineDepressionLevel = (score) => {
    if (score <= 5) return 'Quadro psicológico normal';
    if (score <= 10) return 'Quadro de depressão leve';
    return 'Quadro de depressão severa';
  };

  const depressionLevel = determineDepressionLevel(totalScore);

  // Dados para o gráfico de linha com variação entre 1 e -1
  const chartData = [
    ['Questão', 'Resposta', { role: 'tooltip' }],
    ...gdsQuestions.map((q, index) => [
      `Q${index + 1}`, 
      parseInt(data[q.field as keyof Gds]) === 1 ? 1 : -1, 
      `${boldify(q.question)}\n${boldify('Valor:')} ${parseInt(data[q.field as keyof Gds]) === 1 ? 'Sim' : 'Não'}`
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
        <p className="text-justify"><b>Pontuação Total:</b> {totalScore}</p>
        <p className="text-justify"><b>Nível de Depressão:</b> {depressionLevel}</p>
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
        <h2 className="text-2xl font-bold">Respostas do Usuário</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6">Pergunta</TableHead>
              <TableHead className="w-1/6">Sim</TableHead>
              <TableHead className="w-1/6">Não</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gdsQuestions.map((item) => (
              <TableRow className="h-20" key={item.index}>
                <TableCell className="w-1/2 text-md border-r-2">{item.question}</TableCell>
                <TableCell
                  className="w-1/4 text-white text-center text-md"
                  style={{ backgroundColor: (parseInt(data[item.field]) === 1) ? 'var(--primary)' : 'var(--primary-background)' }}
                >
                  {(parseInt(data[item.field]) === 1) ? 'X' : ''}
                </TableCell>
                <TableCell
                  className="w-1/4 text-white text-center text-md"
                  style={{ backgroundColor: (parseInt(data[item.field]) === 0) ? 'var(--primary)' : 'var(--primary-background)' }}
                >
                  {(parseInt(data[item.field]) === 0) ? 'X' : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GdsResult;
