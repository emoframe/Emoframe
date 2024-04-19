"use client";

import { ElementsType, TemplateElement, TemplateElementInstance, SubmitFunction } from "@/components/template/TemplateElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "@/components/hooks/useDesigner";
import { CircleEllipsis, XCircle } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import React from "react";

const type: ElementsType = "RadioField";

const extraAttributes = {
  label: "Campo de Seleção",
  helperText: "Texto de Apoio",
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  scaleType: z.enum(['likert', 'semantic']),
  optionCount: z.number().min(2).max(10),
  optionLabels: z.array(z.string()).min(2),
});

export const RadioFieldTemplateElement: TemplateElement = {
  type,
  construct: (id: string, params) => ({
    id,
    type,
    extraAttributes: {
      label: "Campo de Seleção",
      helperText: "Texto de Apoio",
      scaleType: params?.scaleType, // Incluindo parâmetros dinâmicos
      optionCount: params?.optionCount,
      options: []
    },
  }),
  designerButtonElement: {
    icon: CircleEllipsis,
    label: "Campo de Seleção",
  },
  designerComponent: DesignerComponent,
  templateComponent: TemplateComponent,
  propertiesComponent: PropertiesComponent,

  validate: (templateElement: TemplateElementInstance, currentValue: string, customParams: {
    options: Array<{ value: string; label: string }>
  } = { options: [] }): boolean => {
    const element = templateElement as CustomInstance;
    const { options } = customParams;

    const isValidValue = options.some(option => option.value === currentValue);

    if (!currentValue) {
      return false;
    }

    return isValidValue;
  },
};

type CustomInstance = TemplateElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, options } = element.extraAttributes;
  const id = `radio-${element.id}`;

  return (
    <div className="flex items-top space-x-2">
      <RadioGroup className="flex flex-row space-x-5 justify-between">
        {options.map((option, index) => (
          <div className="flex flex-col items-center space-y-2" key={index}>
            <RadioGroupItem disabled value={option.value}/>
            <Label className="font-normal text-md">{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>{label}</Label>
        {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
      </div>
    </div>
  );
}


function TemplateComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: TemplateElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState<string | undefined>(defaultValue || undefined);
  const [error, setError] = useState(false);
  const { label, helperText, options } = element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  return (
    <div className="flex flex-col space-y-4">
      <Label htmlFor={element.id} className={cn("font-bold", error && "text-red-500")}>{label}</Label>
      <RadioGroup
        aria-labelledby={element.id}
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue);
          const valid = RadioFieldTemplateElement.validate(element, newValue, { options });
          setError(!valid);
          if (submitValue) {
            submitValue(element.id, newValue);
          }
        }}
      >
        {options.map((option, index) => (
          <RadioGroupItem key={index} id={`${element.id}-${index}`} value={option.value}>
            {option.label}
          </RadioGroupItem>
        ))}
      </RadioGroup>
      {helperText && <p className={cn("text-sm", error && "text-red-500")}>{helperText}</p>}
    </div>
  );
}



type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { updateElement, setSelectedElement } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      optionLabels: element.extraAttributes.optionLabels || Array(element.extraAttributes.optionCount).fill(''),
    },
  });

  // Usando valores monitorados
  const optionLabels = form.watch("optionLabels");
  const optionCount = form.watch("optionCount");
  const scaleType = form.watch("scaleType");

  useEffect(() => {
    // Atualize os rótulos de opção com base na contagem de opções
    const updatedLabels = Array(optionCount).fill('').map((_, index) => optionLabels[index] || '');
    form.setValue("optionLabels", updatedLabels);
  }, [optionCount, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
        options: values.optionLabels.map((label, index) => ({ label, value: index + 1 }))
      },
    });

    setSelectedElement(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyChanges)} className="space-y-3">
        <FormField
          control={form.control}
          name="label"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormControl>
            </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Texto de Apoio</FormLabel>
              <FormControl>
                <Input {...field} />
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormControl>
            </FormItem>
          )}
        />
        <>
          {
            optionLabels.map((label, index) => (
              <React.Fragment key={index}>
                <FormField
                  key={index}
                  control={form.control}
                  name={`optionLabels.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição da Opção {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={`Opção ${index + 1} Descrição`} />
                        {index === 0 || index === optionCount - 1 || scaleType === 'likert' ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.preventDefault();
                              const newLabels = [...optionLabels];
                              newLabels.splice(index, 1);
                              form.setValue("optionLabels", newLabels);
                            }}
                          >
                            <XCircle />
                          </Button>
                        ) : null}
                      </FormControl>
                    </FormItem>
                  )} 
                />
              </React.Fragment>
            ))
          }
        </>
        <Button type="submit" className="w-full">
          Salvar Propriedades
        </Button>
      </form>
    </Form>
  );
}

