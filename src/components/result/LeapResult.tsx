'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Evaluation, Leap, leapQuestions } from '@/types/forms';
import { User } from '@/types/users';

const LeapResult = ({ user, evaluation, data } : {
  user: User,
  evaluation: Evaluation,
  data: Leap
}) => {

  // Função para calcular o valor de cada fator
  const calculateFactor = (factorName: string) => {
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
  const factorValues = uniqueFactors.map(factor => ({
    name: factor,
    value: calculateFactor(factor)
  }));

  // Dados para o gráfico de barras
  const chartData = [
    ['Fator', 'Valor', { role: 'style' }],
    ...factorValues.map(factor => [factor.name, factor.value, '#4CAF50'])
  ];

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
        {factorValues.map(factor => (
          <p className="text-justify" key={factor.name}><b>{factor.name}:</b> {factor.value.toFixed(2)}</p>
        ))}
        <Charts chartType="ColumnChart" width="100%" height="400px" data={chartData} options={chartOptions} />
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
        <h2 className="text-2xl font-bold">Respostas do Cliente</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6">Sentimento</TableHead>
              <TableHead className="w-1/6">Nada ou muito ligeiramente</TableHead>
              <TableHead className="w-1/6">Um pouco</TableHead>
              <TableHead className="w-1/6">Moderadamente</TableHead>
              <TableHead className="w-1/6">Bastante</TableHead>
              <TableHead className="w-1/6">Extremamente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leapQuestions.map((factor) => (
              <TableRow className="h-20" key={factor.index}>
                <TableCell>{factor.question}</TableCell>
                {[1, 2, 3, 4, 5].map((col) => (
                  <TableCell
                    key={col}
                    className="w-1/6 text-white text-center text-md"
                    style={{ backgroundColor: (parseInt(data[factor.field]) === col) ? 'var(--primary)' : 'var(--primary-background)' }}
                  >
                    {(parseInt(data[factor.field]) === col) ? col : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeapResult;
