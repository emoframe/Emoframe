"use client";

import React, { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { saveAnswer } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStepper } from "@/components/ui/hooks/use-stepper";
import { Steps, Step, StepConfig } from "@/components/ui/stepper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FillEvaluationForm, RadioItem, leapQuestions } from "@/types/forms";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { chunk } from "@/lib/utils";

const DefaultProps: RadioItem[] = [
  { value: "1", label: "1 (Nada ou muito ligeiramente)" },
  { value: "2", label: "2 (Um pouco)" },
  { value: "3", label: "3 (Moderadamente)" },
  { value: "4", label: "4 (Bastante)" },
  { value: "5", label: "5 (Extremamente)" },
];

const LeapFormSchema = z.object(
  Object.fromEntries(
    leapQuestions.map(item => [
      item.field,
      z.enum([DefaultProps[0].value, ...DefaultProps.slice(1).map((p) => p.value)], {
        errorMap: (issue, ctx) => ({ message: "Escolha uma opção" })
      })
    ])
  )
);

// Dividir leapItems em 5 partes
const leapQuestionsChunks = chunk(leapQuestions, Math.ceil(leapQuestions.length / 5));

// Gerar steps com 5 partes
const steps: StepConfig[] = leapQuestionsChunks.map((_, index) => ({ label: `Passo ${index + 1}` }));

const LeapForm = (params: FillEvaluationForm) => {
  const FormSchema = !("isViewable" in params) ? LeapFormSchema : z.object({});
  const form = useForm<z.infer<typeof LeapFormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        admiration: "",
        relieved: "",
        tired: "",
        happy: "",
        accept: "",
        heat: "",
        satisfied: "",
        jealous: "",
        attracted: "",
        calm: "",
        funny: "",
        desire: "",
        careful: "",
        strange: "",
        hopeful: "",
        fall_in_love: "",
        conformed: "",
        hungry: "",
        guilty: "",
        cold: "",
        despise: "",
        take_pity_on: "",
        disgusting: "",
        need: "",
        duty: "",
        envy: "",
        humiliated: "",
        interested: "",
        fear: "",
        proud: "",
        shame: "",
        angry: "",
        sleepy: "",
        longing: "",
        sad: "",
        surprised: "",
        thirst: "",
        thoughtful: "",
        serious: "",
        scared: "",
    },
  });

  const { push } = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof LeapFormSchema>) => {
    if (!("isViewable" in params)) {
      saveAnswer(values, params.evaluationId, params.userId).then(() => {
        toast({
          title: "Socilitação aprovada",
          description: "Avaliação preenchida e salva",
        });
        push("/user/evaluations");
      });
    }
  };

  const { activeStep, nextStep, prevStep } = useStepper({
    initialStep: 0,
    steps,
  });

  return (
    <div>
      <Steps activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step
            index={index}
            key={index}
            additionalClassName={{ label: "text-md" }}
            {...step}
          />
        ))}
      </Steps>

      <div className="flex flex-col flex-wrap justify-center gap-8">
        <h1 className="font-bold text-4xl self-center"> LEAP </h1>
        <h2 className="text-md self-center">
          {" "}
          Nesta página você encontrará uma lista com frases sobre você e sobre o
          que está sentindo ou pensando neste momento. Sua tarefa é indicar a
          intensidade de sentimento de 1 a 5 para cada uma dessas frases, sendo
          a 1 (um) a mais fraca e a 5 (cinco) a mais forte. Não existe resposta
          certa ou errada. Sua primeira reação ao ler a frase é a melhor. Você
          deve marcar a intensidade que você está sentindo no momento do
          preenchimento da lista. Clique no botão abaixo para ver exemplos de
          preenchimento:{" "}
        </h2>
        <div className="flex flex-row justify-around">
          <Button
            className="text-lg basis-1/3"
            type="button"
            size="lg"
          >
            Exemplos
          </Button>
        </div>
        <Separator className="my-4" />
        <h2 className="text-md self-center">
          {" "}
          Indique em que medida está sentindo cada uma das emoções AGORA:{" "}
        </h2>

        <React.Suspense
          key={activeStep}
          fallback={<Progress />}
        >
          <Form
            key={activeStep}
            {...form}
          >
            <form
              key={activeStep}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {leapQuestionsChunks[activeStep].map((question, index) => (
                <>
                  <FormField
                    key={"formField" + index}
                    control={form.control}
                    name={question.field}
                    render={({ field }) => (
                      <FormItem className="space-x-5 space-y-5 content-center">
                        <p className="text-xl">
                          <b>{question.question}</b>
                        </p>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            className="flex flex-row space-x-5 justify-between"
                          >
                            {DefaultProps.map((defaultProp, index) => (
                              <FormItem
                                className="flex flex-col items-center space-y-2"
                                key={index}
                              >
                                <FormControl>
                                  <RadioGroupItem value={defaultProp.value} />
                                </FormControl>
                                <FormLabel className="font-normal text-md">
                                  {defaultProp.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="mb-8" />
                </>
              ))}
              <div
                key="buttons"
                className="flex flex-row justify-around mt-8"
              >
                {activeStep != 0 && (
                  <Button
                    className="basis-1/8 text-lg"
                    type="button"
                    size="lg"
                    onClick={() => {
                      prevStep();
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    Anterior
                  </Button>
                )}

                <Button
                  className="basis-1/8 text-lg"
                  type="button"
                  size="lg"
                  onClick={() => {
                    leapQuestionsChunks[activeStep].map((question, index) =>
                      form.setValue(question.field, "")
                    );
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  Limpar
                </Button>

                {activeStep != steps.length - 1 ? (
                  <Button
                    className="basis-1/8 text-lg"
                    type="button"
                    size="lg"
                    onClick={() => {
                      const values = form.getValues(
                        leapQuestionsChunks[activeStep].map(
                          (question, index) => question.field
                        )
                      );
                      const hasNull = !("isViewable" in params)
                        ? Object.values(values).some((value) => value === "")
                        : false;

                      if (hasNull) {
                        toast({
                          title: "Socilitação negada",
                          description: "Preencha todos os campos!",
                        });
                      } else {
                        nextStep();
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    className="basis-1/8 text-lg"
                    type="submit"
                    size="lg"
                  >
                    Enviar
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </React.Suspense>
      </div>
    </div>
  );
};

export default LeapForm;