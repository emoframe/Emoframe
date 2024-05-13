"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { TemplateElements } from "@/components/template/TemplateElements";
import { Button } from "@/components/ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { TemplateAnswers, TemplateFormProps } from "@/types/forms";
import { useRouter } from "next/navigation";
import { saveAnswer } from "@/lib/firebase";


function TemplateForm({ content, ...params } : TemplateFormProps ) {

  const formValues = useRef<TemplateAnswers>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const { push } = useRouter();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = TemplateElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Erro",
        description: "Por favor, verifique o formulário para erros.",
        variant: "destructive",
      });
      return;
    }

    try {
      if(!("isViewable" in params)) {
        saveAnswer(formValues.current, params.evaluationId, params.userId).then(() => {
          toast({
              title: "Socilitação aprovada",
              description: "Avaliação preenchida e salva",
          });
          push('/user/evaluations');
        });  
      }
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Algo deu errado",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 rounded">
          <h1 className="text-2xl font-bold">Avaliação enviada</h1>
          <p className="text-muted-foreground">Obrigado por enviar o formulário, você pode fechar esta página agora.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-wrap justify-center gap-8">
        {content.map((element) => {
          const FormElement = TemplateElements[element.type].templateComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
    
        <Button
          className="mt-8 max-w-[200px]"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Enviar
            </>
          )}
          {pending && <Loader2 className="animate-spin" />}
        </Button>
        
      </div>
  );
}

export default TemplateForm;