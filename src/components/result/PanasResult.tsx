'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Evaluation, Panas } from '@/types/forms';
import { erf } from 'mathjs';
import { User } from '@/types/users';

const PanasResult = ({ user, evaluation, data }: {
  user: User,
  evaluation: Evaluation,
  data: Panas
}) => {

  // Itens que compõem as subescalas de Afeto Positivo e Negativo
  const affectItems = [
    { index: 1, field: 'interested', type: 'positive' },
    { index: 2, field: 'distressed', type: 'negative' },
    { index: 3, field: 'excited', type: 'positive' },
    { index: 4, field: 'upset', type: 'negative' },
    { index: 5, field: 'strong', type: 'positive' },
    { index: 6, field: 'guilty', type: 'negative' },
    { index: 7, field: 'scared', type: 'negative' },
    { index: 8, field: 'hostile', type: 'negative' },
    { index: 9, field: 'enthusiastic', type: 'positive' },
    { index: 10, field: 'proud', type: 'positive' },
    { index: 11, field: 'irritable', type: 'negative' },
    { index: 12, field: 'alert', type: 'negative' },
    { index: 13, field: 'ashamed', type: 'negative' },
    { index: 14, field: 'inspired', type: 'positive' },
    { index: 15, field: 'nervous', type: 'negative' },
    { index: 16, field: 'determined', type: 'positive' },
    { index: 17, field: 'attentive', type: 'positive' },
    { index: 18, field: 'jittery', type: 'negative' },
    { index: 19, field: 'active', type: 'positive' },
    { index: 20, field: 'afraid', type: 'negative' }
  ];

  // Função para calcular o escore somando os valores das respostas para cada item
  const calculateScore = (items: { index: number, field: string, type: string }[], type: string) => {
    return items
      .filter(item => item.type === type)
      .reduce((acc, item) => {
        const response = data[item.field as keyof Panas];
        return acc + (response ? parseInt(response) : 0);
      }, 0);
  };

  const positiveAffectScore = calculateScore(affectItems, 'positive'); // Escore de Afeto Positivo
  const negativeAffectScore = calculateScore(affectItems, 'negative'); // Escore de Afeto Negativo

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

  // Configurações do gráfico
  const chartOptions = {
    legend: { position: 'none' },
    hAxis: {
      minValue: 0,
      maxValue: 50 // Ajuste o valor máximo conforme necessário
    }
  };

  const translateField = (field: string) => {
    const translations: { [key: string]: string } = {
      interested: "Interessado(a)",
      distressed: "Angustiado(a)",
      excited: "Animado(a)",
      upset: "Chateado(a)",
      strong: "Forte",
      guilty: "Culpado(a)",
      scared: "Assustado(a)",
      hostile: "Hostil",
      enthusiastic: "Entusiasmado(a)",
      proud: "Orgulhoso(a)",
      irritable: "Irritado(a)",
      alert: "Alerta",
      ashamed: "Envergonhado(a)",
      inspired: "Inspirado(a)",
      nervous: "Nervoso(a)",
      determined: "Determinado(a)",
      attentive: "Atento(a)",
      jittery: "Trêmulo(a)",
      active: "Ativo(a)",
      afraid: "Com medo"
    };
    return translations[field] || field;
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="font-bold text-4xl self-center">Resultado PANAS</h1>
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
        <p className="text-justify"><b>Escore de Afeto Positivo (10-50):</b> {positiveAffectScore}</p>
        <p className="text-justify"><b>Percentil Normativo:</b> {positiveAffectPercentile}</p>
        <p className="text-justify"><b>Escore de Afeto Negativo (10-50):</b> {negativeAffectScore}</p>
        <p className="text-justify"><b>Percentil Normativo:</b> {negativeAffectPercentile}</p>
        <Charts chartType="ColumnChart" width="100%" height="400px" data={chartData} options={chartOptions} />
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
        <h2 className="text-2xl font-bold">Respostas do Usuário</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sentimento</TableHead>
              <TableHead className="w-1/5">Nada ou muito ligeiramente</TableHead>
              <TableHead className="w-1/5">Um pouco</TableHead>
              <TableHead className="w-1/5">Moderadamente</TableHead>
              <TableHead className="w-1/5">Bastante</TableHead>
              <TableHead className="w-1/5">Extremamente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {affectItems.map((item) => (
              <TableRow key={item.index}>
                <TableCell className="text-white text-md" style={{ backgroundColor: (item.type == 'positive') ? '#4CAF50' : '#F44336' }}>{translateField(item.field)}</TableCell>
                {[1, 2, 3, 4, 5].map((col) => (
                  <TableCell
                    key={col}
                    className="w-1/5 text-white text-center text-md"
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

export default PanasResult;