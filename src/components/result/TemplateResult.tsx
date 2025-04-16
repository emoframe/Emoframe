"use client";

import React from "react";
import { Evaluation, Answer, Template } from "@/types/forms";
import { User } from "@/types/users";
import Charts from "@/components/chart/Charts";
import { Separator } from "@/components/ui/separator";

// Tipagens auxiliares para cada tipo de escala
interface SemanticItem {
  dimIndex: number;
  left?: string;
  right?: string;
  value: number;
}
interface LikertItem {
  question: string;
  value: number;
  label: string;
  scaleSize: number;
}

type ChartKind = 'BarChart' | 'LineChart';

/**
 * Combina respostas e metadados do template para escala semântica.
 */
function combineSemantic(
  data: Record<string, string>,
  template: Template
): SemanticItem[] {
  const result: SemanticItem[] = [];
  const tq = template.questions ?? {};
  // Itera sobre propriedades (seja array ou objeto)
  for (const key in tq) {
    const q: any = (tq as any)[key];
    if (q.type === 'OptionsField' && data[q.id] != null) {
      const rawVal = data[q.id];
      const value = rawVal ? parseInt(rawVal, 10) : NaN;
      if (!isNaN(value)) {
        result.push({
          dimIndex: result.length + 1,
          left: q.extraAttributes?.leftLabel,
          right: q.extraAttributes?.rightLabel,
          value,
        });
      }
    }
  }
  return result;
}

/**
 * Combina respostas e metadados do template para escala Likert.
 */
function combineLikert(
  data: Record<string, string>,
  template: Template
): LikertItem[] {
  const result: LikertItem[] = [];
  // Force questions como array de qualquer tipo
  const questions: any[] = Array.isArray(template.questions)
    ? template.questions
    : Object.values(template.questions ?? {});
  questions.forEach((q) => {
    if (q.type === 'OptionsField') {
      const answer = data[q.id] ?? '';
      const value = parseInt(answer, 10);
      const opts = q.extraAttributes?.options || [];
      const found = opts.find((o: any) => o.value === answer);
      result.push({
        question: q.extraAttributes?.label || '',
        value: isNaN(value) ? 0 : value,
        label: found?.label || '',
        scaleSize: q.extraAttributes?.questionsSize ?? opts.length,
      });
    }
  });
  return result;
}

export default function TemplateResult({
  user,
  evaluation,
  data,
  template,
}: {
  user: User;
  evaluation: Evaluation;
  data: Answer;
  template: Template;
}) {
  const isLikert = template.scale_type === 'likert';

  let chartData: any[][] = [];
  let chartOptions: any = {};
  let chartType: ChartKind;

  if (isLikert) {
    const combined = combineLikert(data as Record<string, string>, template);
    chartData = [
      ['Pergunta', 'Negativo', 'Positivo'],
      ...combined.map((item) => {
        const mid = Math.ceil(item.scaleSize / 2);
        const diff = item.value - mid;
        return [item.question, Math.min(diff, 0), Math.max(diff, 0)];
      }),
    ];
    chartType = 'BarChart';

    // Calcula ticks de hAxis de -half a +half
    const total = template.questions_size ?? (Array.isArray(template.questions)
      ? template.questions.length
      : Object.values(template.questions ?? {}).length);
    const half = Math.floor(total / 2);
    const ticks = Array.from({ length: half * 2 + 1 }, (_, i) => i - half);

    chartOptions = {
      legend: { position: 'none' },
      chartArea: { width: '70%', height: '75%' },
      hAxis: {
        viewWindowMode: 'explicit',
        viewWindow: { min: -half, max: half },
        ticks,
      },
      isStacked: true,
      bars: 'horizontal',
      colors: ['#d9534f', '#5cb85c'],
    };
  } else {
    const combined = combineSemantic(data as Record<string, string>, template);
    chartData = [
      ['Escala', 'DimIndexLeft', 'DimIndexRight', { role: 'tooltip' }],
      ...combined.map((item) => [
        item.value,
        item.dimIndex,
        item.dimIndex,
        `Escala:\n${item.left ?? ''} ←→ ${item.right ?? ''}\nValor: ${item.value}`,
      ]),
    ];
    chartType = 'LineChart';
    chartOptions = {
      focusTarget: 'datum',
      legend: { position: 'none' },
      hAxis: {
        title: 'Escala (1 a 5)',
        viewWindow: { min: 1, max: 5 },
        ticks: [1, 2, 3, 4, 5],
      },
      series: {
        0: { targetAxisIndex: 0, tooltip: false, enableInteractivity: false, lineDashStyle: [4, 2], lineWidth: 3, pointSize: 6, color: 'blue' },
        1: { targetAxisIndex: 1, tooltip: true, enableInteractivity: true, lineWidth: 0, pointSize: 8, visibleInLegend: false, color: 'blue' }
      },
      vAxes: {
        0: {
          ticks: combineSemantic(data as Record<string, string>, template).map((_, i) => ({ v: i + 1, f: combineSemantic(data as Record<string, string>, template)[i].left ?? '' })),
          direction: -1,
          viewWindow: { min: 1, max: combineSemantic(data as Record<string, string>, template).length },
          textPosition: 'out',
        },
        1: {
          ticks: combineSemantic(data as Record<string, string>, template).map((_, i) => ({ v: i + 1, f: combineSemantic(data as Record<string, string>, template)[i].right ?? '' })),
          direction: -1,
          viewWindow: { min: 1, max: combineSemantic(data as Record<string, string>, template).length },
          textPosition: 'out',
        },
      },
      chartArea: { width: '70%', height: '70%' },
      tooltip: { isHtml: false },
    };
  }

  return (
    <div className="w-full max-w-full mx-auto p-8 flex flex-col gap-8">
      <h1 className="font-bold text-4xl self-center">{template.title}</h1>
      {template.description && <p className="text-center">{template.description}</p>}

      <Separator className="my-4" />

      {/* Dados do usuário e avaliação */}
      <div className="flex flex-col gap-2">
        <p><b>Usuário:</b> {user.name} {user.surname}</p>
        <p><b>Data de Nascimento:</b> {user.birthday?.toLocaleDateString()} ({user.birthday ? new Date().getFullYear() - user.birthday.getFullYear() : '?'} anos)</p>
        <p><b>E-mail:</b> {user.email}</p>
        <p><b>Telefone:</b> {user.phone}</p>
        <p><b>Avaliação:</b> {evaluation.identification}</p>
        <p><b>Data da Avaliação:</b> {evaluation.date.toLocaleDateString()}</p>
      </div>

      <Separator className="my-4" />

      {/* Gráfico */}
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-2">
          {isLikert ? 'Gráfico Likert Divergente' : 'Gráfico de Diferencial Semântico'}
        </h2>
        <div className="w-full h-[500px]">
          <Charts
            chartType={chartType}
            data={chartData}
            width="100%"
            height="100%"
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
}

