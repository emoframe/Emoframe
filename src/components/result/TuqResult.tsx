'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Evaluation, TuqRespostas } from '@/types/forms';
import { User } from '@/types/users';

interface TuqQuestion {
  id: keyof TuqRespostas;
  texto: string;
  dominio: string;
}

const perguntasTuq: TuqQuestion[] = [
  { id: 'q1', texto: 'O sistema de telessaúde me ajudou a ser mais eficaz.', dominio: 'Utilidade' },
  { id: 'q2', texto: 'O sistema de telessaúde foi útil para minha situação.', dominio: 'Utilidade' },
  { id: 'q3', texto: 'O sistema de telessaúde melhorou minha capacidade de comunicação.', dominio: 'Utilidade' },
  { id: 'q4', texto: 'O sistema de telessaúde facilitou a realização das minhas tarefas.', dominio: 'Utilidade' },
  { id: 'q5', texto: 'O sistema de telessaúde poupou meu tempo.', dominio: 'Utilidade' },
  { id: 'q6', texto: 'O sistema de telessaúde atendeu às minhas necessidades.', dominio: 'Utilidade' },
  { id: 'q7', texto: 'As informações fornecidas pelo sistema de telessaúde foram claras.', dominio: 'Facilidade de Uso da Interface' },
  { id: 'q8', texto: 'As informações fornecidas pelo sistema foram fáceis de entender.', dominio: 'Facilidade de Uso da Interface' },
  { id: 'q9', texto: 'O sistema de telessaúde foi fácil de usar.', dominio: 'Facilidade de Uso da Interface' },
  { id: 'q10', texto: 'Aprendi facilmente a usar o sistema de telessaúde.', dominio: 'Facilidade de Uso da Interface' },
  { id: 'q11', texto: 'O sistema de telessaúde foi confiável.', dominio: 'Qualidade da Interação' },
  { id: 'q12', texto: 'O sistema de telessaúde funcionou de maneira consistente.', dominio: 'Qualidade da Interação' },
  { id: 'q13', texto: 'O sistema de telessaúde teve desempenho estável.', dominio: 'Qualidade da Interação' },
  { id: 'q14', texto: 'O sistema de telessaúde estava disponível quando precisei.', dominio: 'Qualidade da Interação' },
  { id: 'q15', texto: 'O sistema de telessaúde protegeu minha privacidade.', dominio: 'Confiabilidade' },
  { id: 'q16', texto: 'O sistema de telessaúde manteve meus dados seguros.', dominio: 'Confiabilidade' },
  { id: 'q17', texto: 'O sistema de telessaúde foi confiável em relação à segurança.', dominio: 'Confiabilidade' },
  { id: 'q18', texto: 'Estou satisfeito com o sistema de telessaúde.', dominio: 'Satisfação' },
  { id: 'q19', texto: 'Recomendaria o sistema de telessaúde a outros.', dominio: 'Satisfação' },
  { id: 'q20', texto: 'No geral, o sistema de telessaúde atendeu às minhas expectativas.', dominio: 'Satisfação' },
  { id: 'q21', texto: 'Usaria o sistema de telessaúde novamente.', dominio: 'Satisfação' }
];

const dominios = [
  'Utilidade',
  'Facilidade de Uso da Interface',
  'Qualidade da Interação',
  'Confiabilidade',
  'Satisfação'
];

const TuqResult = ({ user, evaluation, data }: {
  user: User,
  evaluation: Evaluation,
  data: TuqRespostas
}) => {
  const getInterpretation = (score: number) => {
    if (score <= 3.0) return "Usabilidade Baixa";
    if (score <= 5.0) return "Usabilidade Moderada";
    return "Usabilidade Alta";
  };

  const calculateDomainScore = (dominio: string) => {
    const qs = perguntasTuq.filter(q => q.dominio === dominio);
    let sum = 0;
    let count = 0;
    qs.forEach(q => {
      const val = data[q.id];
      if (val && val !== 'na' && typeof val === 'string' && !isNaN(Number(val))) {
        sum += Number(val);
        count++;
      } else if (typeof val === 'number') {
        sum += val;
        count++;
      }
    });
    return count > 0 ? Number((sum / count).toFixed(2)) : 0;
  };

  const chartData = [
    ['Domínio', 'Score', { role: 'style' }, { role: 'annotation' }],
    ...dominios.map(d => {
      const score = calculateDomainScore(d);
      return [d, score, 'color: #3182ce', score.toString()];
    })
  ];

  const chartOptions = {
    legend: { position: 'none' },
    hAxis: { title: 'Domínios', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0, maxValue: 7 },
    chartArea: { width: '80%', height: '70%' },
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="font-bold text-4xl self-center">Resultado TUQ</h1>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Informações do Usuário</h2>
        <p><b>Nome do Usuário:</b> {user.name} {user.surname}</p>
        <p><b>E-mail:</b> {user.email}</p>
        <p><b>Avaliação:</b> {evaluation.identification}</p>
        <p><b>Data da Avaliação:</b> {evaluation.date.toString()}</p>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Resultados</h2>
        <p className="text-center mt-4">
          <span className="bg-primary text-white py-2 px-4 rounded text-2xl font-bold">
            Pontuação Geral: {data.score ?? 0}
          </span>
        </p>
        <p className="text-center text-lg mt-2">
          Interpretação: <b>{getInterpretation(data.score ?? 0)}</b>
        </p>

        <h3 className="text-xl font-bold mt-8 mb-2">Scores por Domínio</h3>
        <Charts chartType="ColumnChart" width="100%" height="400px" data={chartData} options={chartOptions} />
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Informações de Pontuação e Interpretação</h2>
        <p className="text-justify">
          O <b>Telehealth Usability Questionnaire (TUQ)</b> é utilizado para avaliar a usabilidade de sistemas de telessaúde.
          Ele mede aspectos como Utilidade, Facilidade de Uso, Qualidade da Interação, Confiabilidade e Satisfação Geral.
          As respostas são baseadas em uma escala Likert de 1 a 7, onde itens respondidos como "N/A" (Não Aplicável) são descartados da média final.
        </p>

        <h3 className="text-xl font-bold mt-4">Interpretação da Pontuação TUQ</h3>
        <Table className="mt-2 mb-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Pontuação Geral (Média)</TableHead>
              <TableHead className="w-1/2">Grau de Usabilidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1.0 a 3.0</TableCell>
              <TableCell className="font-bold text-red-600">Usabilidade Baixa</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3.1 a 5.0</TableCell>
              <TableCell className="font-bold text-yellow-600">Usabilidade Moderada</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5.1 a 7.0</TableCell>
              <TableCell className="font-bold text-green-600">Usabilidade Alta</TableCell>
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
              <TableHead className="w-[20%]">Domínio / Questão</TableHead>
              <TableHead className="text-center text-xs w-[10%]">1 (Discordo Totalmente)</TableHead>
              <TableHead className="text-center text-xs w-[10%]">2</TableHead>
              <TableHead className="text-center text-xs w-[10%]">3</TableHead>
              <TableHead className="text-center text-xs w-[10%]">4 (Neutro)</TableHead>
              <TableHead className="text-center text-xs w-[10%]">5</TableHead>
              <TableHead className="text-center text-xs w-[10%]">6</TableHead>
              <TableHead className="text-center text-xs w-[10%]">7 (Concordo Totalmente)</TableHead>
              <TableHead className="text-center text-xs w-[10%]">N/A</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {perguntasTuq.map((q, index) => {
              const resposta = String(data[q.id]);
              return (
                <TableRow className="h-24" key={q.id}>
                  <TableCell className="text-sm border-r-2">
                    <span className="font-bold text-xs text-primary block mb-1">{q.dominio}</span>
                    {index + 1}. {q.texto}
                  </TableCell>
                  {['1', '2', '3', '4', '5', '6', '7', 'na'].map((col) => (
                    <TableCell
                      key={col}
                      className="text-white text-center font-bold text-md border-r border-b w-[10%]"
                      style={{ 
                        backgroundColor: (resposta === col) ? 'var(--primary)' : 'var(--primary-background)'
                      }}
                    >
                      {(resposta === col) ? (col === 'na' ? 'N/A' : col) : ''}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TuqResult;
