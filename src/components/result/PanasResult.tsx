'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Evaluation, Panas } from '@/types/forms';
import { erf } from 'mathjs';
import { User } from '@/types/users';

const PanasResult = ({ user, evaluation, data } : {
  user: User,
  evaluation: Evaluation,
  data: Panas
}) => {
  // Itens que compõem a subescala de Afeto Positivo
  const positiveAffectItems = [
    'interested', 'excited', 'hearty', 'enthusiastic', 'proud', 
    'pleasantly_surprised', 'inspired', 'determined', 'charmed', 'active'
  ];

  // Itens que compõem a subescala de Afeto Negativo
  const negativeAffectItems = [
    'repulsion', 'tormented', 'scared', 'guilty', 'disturbed', 
    'trembling', 'nervous', 'angry', 'remorse', 'frightened'
  ];

  // Função para calcular o escore somando os valores das respostas para cada item
  const calculateScore = (items: string[]) => {
    return items.reduce((acc, item) => {
      const response = data[item as keyof Panas];
      return acc + (response ? parseInt(response) : 0);
    }, 0);
  };

  const positiveAffectScore = calculateScore(positiveAffectItems); // Escore de Afeto Positivo
  const negativeAffectScore = calculateScore(negativeAffectItems); // Escore de Afeto Negativo

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
  const positiveAffectPercentile = calculatePercentile(positiveAffectScore, meanPositive, sdPositive);
  const negativeAffectPercentile = calculatePercentile(negativeAffectScore, meanNegative, sdNegative);

  // Dados para o gráfico de barras
  const chartData = [
    ['Tipo de Afeto', 'Pontuação', { role: 'style' }],
    ['Afeto Positivo', positiveAffectScore, '#4CAF50'],
    ['Afeto Negativo', negativeAffectScore, '#F44336']
  ];

  // Função para determinar a cor de fundo da célula com base no valor
  const getColor = (value: string, column: number) => {
    return parseInt(value) === column ? '#D1C4E9' : '#FFFFFF';
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl self-center">Resultados PANAS</h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Informações do Usuário</h2>
        <p><b>Nome do Usuário:</b> {user.name}</p>
        <p><b>Data de Nascimento (idade):</b> {user.birthday?.toLocaleDateString()} ({new Date().getFullYear() - (user.birthday?.getFullYear() as number)})</p>
        <p><b>Avaliação:</b> Positive and Negative Affect Schedule (PANAS)</p>
        <p><b>Data da Avaliação:</b> {new Date(evaluation.date).toLocaleDateString()}</p>
      </div>
      
      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Resultados</h2>
        <p><b>Escore de Afeto Positivo (10-50):</b> {positiveAffectScore}</p>
        <p><b>Percentil Normativo:</b> {positiveAffectPercentile}</p>
        <p><b>Escore de Afeto Negativo (10-50):</b> {negativeAffectScore}</p>
        <p><b>Percentil Normativo:</b> {negativeAffectPercentile}</p>
        <Charts chartType="ColumnChart" width="100%" height="400px" data={chartData} />
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Informações de Pontuação e Interpretação</h2>
        <p>
          A pontuação do PANAS é separada em escores de Afeto Positivo (PA) e Afeto Negativo (NA), com uma pontuação mais alta indicando mais afeto positivo ou negativo, respectivamente.
        </p>
        <p>
          Embora uma pontuação muito alta na escala de PA mereça atenção (ou seja, pacientes maníacos geralmente pontuam muito alto em PA), a principal preocupação clínica será com pacientes que mostram níveis muito baixos de afeto positivo (ou seja, são anedônicos) e, portanto, obtêm baixas classificações percentuais.
          Em contraste, uma pontuação alta no NA (e um percentil alto) é um indicador de sofrimento psicológico.
        </p>
        <p>
          Os dados normativos foram coletados de mais de 1.000 adultos australianos e são usados para calcular percentis. Uma classificação percentil de 50 indica um nível médio de afetividade positiva ou negativa em comparação com o grupo normativo.
        </p>
        <p>
          Existem duas subescalas do PANAS:
          <ul>
            <li><b>Afeto Positivo (itens 1, 3, 5, 9, 10, 12, 14, 16, 17 e 19):</b> Pontuações mais altas representam níveis mais altos de PA e estão associadas ao engajamento prazeroso com o ambiente.</li>
            <li><b>Afeto Negativo (itens 2, 4, 6, 7, 8, 11, 13, 15, 18 e 20):</b> Pontuações mais altas representam níveis mais altos de NA e refletem uma dimensão de sofrimento geral, resumindo uma variedade de estados negativos, como raiva, culpa ou ansiedade.</li>
          </ul>
        </p>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Respostas do Cliente</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sentimento</TableHead>
              <TableHead>Nada ou muito ligeiramente</TableHead>
              <TableHead>Um pouco</TableHead>
              <TableHead>Moderadamente</TableHead>
              <TableHead>Bastante</TableHead>
              <TableHead>Extremamente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(data).map(([field, value]) => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                {[1, 2, 3, 4, 5].map((col) => (
                  <TableCell
                    key={col}
                    style={{ backgroundColor: getColor(value, col) }}
                  >
                    {col === parseInt(value) ? value : ''}
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

export default PanasResult;