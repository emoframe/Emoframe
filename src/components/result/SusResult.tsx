'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Evaluation, Sus, susQuestions } from '@/types/forms';
import { User } from '@/types/users';
import { boldify } from '@/lib/utils';

const SusResult = ({ user, evaluation, data }: {
  user: User,
  evaluation: Evaluation,
  data: Sus
}) => {

  // Função para calcular a pontuação do SUS
  const calculateSusScore = (data: Sus) => {
    // Obter pontuações das questões ímpares e pares
    const oddScores = susQuestions.filter(q => q.index % 2 !== 0).map(q => parseInt(data[q.field as keyof Sus]));
    const evenScores = susQuestions.filter(q => q.index % 2 === 0).map(q => parseInt(data[q.field as keyof Sus]));

    // Calcular X e Y
    const X = oddScores.reduce((sum, score) => sum + score, 0) - 5;
    const Y = 25 - evenScores.reduce((sum, score) => sum + score, 0);

    // Calcular pontuação final
    return (X + Y) * 2.5;
  };

  // Calcular a pontuação do SUS
  const susScore = calculateSusScore(data);

  // Dados para o gráfico de linha
  const chartData = [
    ['Questão', 'Variação', { role: 'tooltip'}],
    ...susQuestions.map((q, index) => [
      `Q${index + 1}`, 
      parseInt(data[q.field as keyof Sus]), 
      `${boldify(q.label)}\n${boldify('Valor:')} ${data[q.field as keyof Sus]}`
    ])
  ];

  // Configurações do gráfico de linha
  const chartOptions = {
    legend: { position: 'none' },
    hAxis: { title: 'Questões', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 1, maxValue: 5 },
    chartArea: { width: '80%', height: '70%' },
    tooltip: { isHtml: false },
    series: {
      0: { color: '#6EA05A' } // Cor da linha do gráfico
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="font-bold text-4xl self-center">Resultado SUS</h1>
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
        <p className="text-center mt-4">
          <span className="bg-primary text-white py-2 px-4 rounded text-2xl font-bold">
          Pontuação: {susScore}
          </span>
        </p>

        <Charts chartType="LineChart" width="100%" height="400px" data={chartData} options={chartOptions} />
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Informações de Pontuação e Interpretação</h2>
        <p className="text-justify">
          A pontuação do SUS é calculada com base nas respostas a 10 questões que avaliam a usabilidade do sistema. A pontuação total varia de 0 a 100, com uma pontuação mais alta indicando maior usabilidade.
        </p>
        <p className="text-justify">
          A pontuação geral do SUS é calculada usando a seguinte estrutura:
          <ul className='list-disc pl-4'>
            <li>Some a pontuação total de todas as questões ímpares (questões 1, 3, 5, 7 e 9) e, em seguida, subtraia 5 do total para obter (X).</li>
            <li>Some a pontuação total de todas as questões de número par (questões 2, 4, 6, 8 e 10), então subtraia esse total de 25 para obter (Y).</li>
            <li>Some a pontuação total dos novos valores (X+Y) e multiplique por 2,5.</li>
          </ul>
          A pontuação média do SUS é 68.
        </p>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Interpretação da Pontuação SUS</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2 text-lg font-bold border-r-2">Pontuação</TableHead>
              <TableHead className="w-1/2 text-lg font-bold">Interpretação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-md border-r-2">Menor que 60</TableCell>
              <TableCell className="text-md">Inaceitável</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-md border-r-2">60-70</TableCell>
              <TableCell className="text-md">Ok</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-md border-r-2">70-80</TableCell>
              <TableCell className="text-md">Bom</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-md border-r-2">80-90</TableCell>
              <TableCell className="text-md">Excelente</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-md border-r-2">Maior que 90</TableCell>
              <TableCell className="text-md">Melhor usabilidade possível</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Respostas do Usuário</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6">Questão</TableHead>
              <TableHead className="w-1/6">Nada ou muito ligeiramente</TableHead>
              <TableHead className="w-1/6">Um pouco</TableHead>
              <TableHead className="w-1/6">Moderadamente</TableHead>
              <TableHead className="w-1/6">Bastante</TableHead>
              <TableHead className="w-1/6">Extremamente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {susQuestions.map((item) => (
              <TableRow className="h-36" key={item.index}>
                <TableCell className="text-md border-r-2">{item.label}</TableCell>
                {[1, 2, 3, 4, 5].map((col) => (
                  <TableCell
                    key={col}
                    className="w-1/6 text-white text-center text-md"
                    style={{ backgroundColor: (parseInt(data[item.field]) === col) ? 'var(--primary)' : 'var(--primary-background)' }}
                  >
                    {(parseInt(data[item.field]) === col) ? col : ''}
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

export default SusResult;
