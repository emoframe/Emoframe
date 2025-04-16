"use client";

import React from "react";
import { Evaluation, Answer, Template } from "@/types/forms";
import { User } from "@/types/users";
import Charts from "@/components/chart/Charts";
import { Separator } from "@/components/ui/separator";

/**
 * Combina as respostas (data) com as perguntas do template (leftLabel, rightLabel).
 * Retorna array de objetos { questionId, leftLabel, rightLabel, value }.
 */
function combineDataAndTemplate(
  data: { [questionId: string]: string },
  template: Template
) {
  const result: {
    questionId: string;
    leftLabel?: string;
    rightLabel?: string;
    value: number;
  }[] = [];

  if (template.questions) {
    for (const key in template.questions) {
      const question = template.questions[key];
      // Consideramos apenas perguntas do tipo "OptionsField"
      if (question.type === "OptionsField") {
        const questionId = question.id;
        // Se o usuário tiver respondido a esta pergunta
        if (data[questionId]) {
          const value = parseInt(data[questionId], 10);
          result.push({
            questionId,
            leftLabel: question.extraAttributes?.leftLabel,
            rightLabel: question.extraAttributes?.rightLabel,
            value,
          });
        }
      }
    }
  }
  return result;
}

type TemplateResultProps = {
  user: User;
  evaluation: Evaluation;
  data: Answer;      // Ex.: { "488": "4", "2211": "5", ... }
  template: Template;
};

/**
 * Exibe um gráfico de Diferencial Semântico com:
 * - Escala (1..5) no eixo horizontal
 * - Dimensões no eixo vertical
 * - LeftLabel de cada dimensão à esquerda, RightLabel à direita
 * - Uma linha conectando as respostas de cada dimensão de cima para baixo
 */
export default function TemplateResult({
  user,
  evaluation,
  data,
  template,
}: TemplateResultProps) {
  const combined = combineDataAndTemplate(
    data as { [questionId: string]: string },
    template
  );

  // 1) Tipar o chartData para permitir misturar tipos (string, number, null, etc.)
  const chartData: any[][] = [
    // Quatro colunas:
    // 1) Escala (x), 2) DimIndexLeft (y, série 1),
    // 3) DimIndexRight (y, série 2 - forçada a null),
    // 4) tooltip
    ["Escala", "DimIndexLeft", "DimIndexRight", { role: "tooltip" }],
  ];

  // Define o formato dos ticks (v: número, f: string)
  const leftTicks: { v: number; f: string }[] = [];
  const rightTicks: { v: number; f: string }[] = [];


  // 2) Preencher cada linha
  combined.forEach((item, index) => {
    const dimIndex = index + 1;
    const tooltip = `Escala:\n${item.leftLabel ?? ""} ←→ ${item.rightLabel ?? ""}\nValor: ${item.value}`;
    
    // value => eixo X (1..5)
    // dimIndex => eixo Y
    chartData.push([item.value, dimIndex, dimIndex, tooltip]);

    leftTicks.push({ v: dimIndex, f: item.leftLabel ?? "" });
    rightTicks.push({ v: dimIndex, f: item.rightLabel ?? "" });
  });

  // 3) Opções do gráfico
  //   - hAxis: escala de 1 a 5 (pode ajustar para 1..9 se necessário)
  //   - vAxes[0]: lado esquerdo, vAxes[1]: lado direito
  //   - direction: -1 => a 1ª dimensão aparece no topo
  //   - series[0].targetAxisIndex = 0 => usa o eixo vertical da esquerda
  //   - A 2ª vAxis serve apenas para exibir os rótulos do lado direito
  const chartOptions = {
    legend: { position: "none" },
    hAxis: {
      title: "Escala (1 a 5)",
      viewWindow: { min: 1, max: 5 },
      ticks: [1, 2, 3, 4, 5],
    },
    series: {
      0: {
        // Primeira série (coluna "DimIndexLeft")
        targetAxisIndex: 0,        // usa vAxes[0]
        lineDashStyle: [4, 2],     // tracejada (remova se quiser contínua)
        lineWidth: 3,
        pointSize: 6,
      },
      1: {
        // Segunda série (coluna "DimIndexRight")
        targetAxisIndex: 1,        // usa vAxes[1]
        lineWidth: 0,              // sem linha
        pointSize: 0,              // sem pontos
        visibleInLegend: false,     // não aparece na legenda
      },
    },
    // Eixos verticais: um para o lado esquerdo, outro para o direito
    vAxes: {
      0: {
        ticks: leftTicks,
        direction: -1,
        viewWindow: { min: 1, max: combined.length },
      },
      1: {
        ticks: rightTicks,
        direction: -1,
        viewWindow: { min: 1, max: combined.length },
      },
    },
    chartArea: {
      width: "70%",
      height: "70%",
    },
    tooltip: { isHtml: false },
  };

  return (
    <div className="flex flex-col gap-8 p-8 w-full w-min[800px]">
      <h1 className="font-bold text-4xl self-center">{template.title}</h1>
      {template.description && (
        <p className="text-center">{template.description}</p>
      )}

      <Separator className="my-4" />

      {/* Informações do Usuário e da Avaliação */}
      <div className="flex flex-col gap-2">
        <p>
          <b>Usuário:</b> {user.name} {user.surname}
        </p>
        <p>
          <b>Data de Nascimento:</b>{" "}
          {user.birthday?.toLocaleDateString()} (
          {user.birthday
            ? new Date().getFullYear() - user.birthday.getFullYear()
            : "?"}{" "}
          anos)
        </p>
        <p>
          <b>E-mail:</b> {user.email}
        </p>
        <p>
          <b>Telefone:</b> {user.phone}
        </p>
        <p>
          <b>Avaliação:</b> {evaluation.identification}
        </p>
        <p>
          <b>Data da Avaliação:</b> {evaluation.date.toLocaleDateString()}
        </p>
      </div>

      <Separator className="my-4" />

      <div className="w-full">
        <h2 className="text-2xl font-bold mb-2">
          Gráfico de Diferencial Semântico
        </h2>
        <div className="w-full h-[500px]">
          <Charts
            chartType="LineChart"
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
