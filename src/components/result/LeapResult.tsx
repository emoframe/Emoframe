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

  // Função para traduzir os campos das questões para o português
  const translateField = (field: string) => {
    const translations: { [key: string]: string } = {
      fear: "Estou com medo",
      scared: "Estou assustado(a)",
      shame: "Estou com vergonha",
      serious: "Estou sem graça",
      guilty: "Sinto-me culpado(a)",
      sad: "Sinto-me triste",
      humiliated: "Sinto-me humilhado(a)",
      take_pity_on: "Tenho pena de alguém",
      surprised: "Sinto-me surpreso(a)",
      happy: "Estou alegre",
      proud: "Sinto-me orgulhoso(a)",
      relieved: "Estou aliviado(a)",
      hopeful: "Estou com esperança",
      interested: "Sinto-me interessado(a)",
      calm: "Sinto-me calmo(a)",
      funny: "Acho algo engraçado",
      admiration: "Sinto uma admiração por alguém",
      longing: "Sinto saudade de alguém",
      despise: "Faço pouco caso de alguém",
      angry: "Sinto raiva",
      disgusting: "Estou com nojo",
      envy: "Sinto inveja de alguém",
      attracted: "Sinto atração sexual por alguém",
      fall_in_love: "Estou gostando de alguém",
      jealous: "Sinto ciúme de alguém",
      need: "Sinto uma necessidade",
      thoughtful: "Estou refletindo",
      desire: "Sinto um desejo",
      duty: "Sinto uma obrigação",
      sleepy: "Estou com sono",
      hungry: "Estou com fome",
      thirst: "Estou com sede",
      tired: "Estou cansado(a)",
      careful: "Estou tomando cuidado",
      strange: "Acho algo estranho",
      cold: "Estou com frio",
      heat: "Estou com calor",
      conformed: "Estou conformado(a)",
      accept: "Estou aceitando alguma coisa",
      satisfied: "Estou cheio(a)"
    };
    return translations[field] || field;
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
        <p><b>Data da Avaliação:</b> {new Date(evaluation.date).toLocaleDateString()}</p>
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
              <TableHead>Sentimento</TableHead>
              <TableHead className="w-1/5">Nada ou muito ligeiramente</TableHead>
              <TableHead className="w-1/5">Um pouco</TableHead>
              <TableHead className="w-1/5">Moderadamente</TableHead>
              <TableHead className="w-1/5">Bastante</TableHead>
              <TableHead className="w-1/5">Extremamente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leapQuestions.map((factor) => (
              <TableRow key={factor.index}>
                <TableCell>{translateField(factor.field)}</TableCell>
                {[1, 2, 3, 4, 5].map((col) => (
                  <TableCell
                    key={col}
                    className="w-1/5 text-white text-center text-md"
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
