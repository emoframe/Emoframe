"use client";

import { ElementsType, TemplateElement, TemplateElementInstance, SubmitFunction } from "@/components/template/TemplateElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { number, string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import useDesigner from "@/components/hooks/useDesigner";
import { CircleEllipsis, XCircle } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import React from "react";

const type: ElementsType = "OptionsField";

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  scaleType: z.enum(['likert', 'semantic']),
  questionsSize: z.number().min(2).max(10),
  options: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).min(2),
});

export const OptionsFieldTemplateElement: TemplateElement = {
  type,
  construct: (id: string, params) => ({
    id,
    type,
    extraAttributes: {
      label: "Campo de Seleção",
      helperText: "Texto de Apoio",
      scaleType: params?.scaleType, // Incluindo parâmetros dinâmicos
      questionsSize: params?.questionsSize,
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
  extraAttributes: {
    label: string,
    helperText: string,
    scaleType: string,
    questionsSize: number,
    options: Array<{label: string, value: string}>,
  }
};

function DesignerComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, options } = element.extraAttributes;
  const id = `options-${element.id}`;

  return (
    <div className="flex flex-col items-top space-y-4 w-full">
      <div className="grid gap-1.5 leading-none">
        <Label className="text-muted-foreground">Campo de Seleção</Label>
        <p className="text-lg">{label}</p>
        {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
      </div>
      <RadioGroup className="flex flex-row content-center justify-between">
        {options.map((option, index) => (
          <div className="flex flex-col items-center space-y-2" key={index}>
            <RadioGroupItem disabled value={option.value}/>
            <Label className="font-normal text-[0.8rem]">{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
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
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={element.id} className={cn("font-bold", error && "text-red-500")}>{label}</Label>
        {helperText && <p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}>{helperText}</p>}
      </div>
      <RadioGroup
        aria-labelledby={element.id}
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue);
          const valid = OptionsFieldTemplateElement.validate(element, newValue, { options });
          setError(!valid);
          if (submitValue) {
            submitValue(element.id, newValue);
          }
        }}
        className="flex flex-row content-center justify-between"
      >
        {options.map((option, index) => (
          <div className="flex flex-col items-center space-y-2" key={index}>
            <RadioGroupItem key={index} id={`${element.id}-${index}`} value={option.value} />
            <Label className="font-normal text-[0.8rem]">{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  const { updateElement, setSelectedElement } = useDesigner();
  const element = elementInstance as CustomInstance;
  
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      scaleType: element.extraAttributes.scaleType as ("likert" | "semantic"),
      questionsSize: element.extraAttributes.questionsSize,
      options: element.extraAttributes.options
    },
  });

  const { control, handleSubmit, watch, setValue } = form;
  const options = watch("options");

  useEffect(() => {
    const generatedOptions = Array.from({ length: element.extraAttributes.questionsSize }, (_, index) => ({
        label: (element.extraAttributes.scaleType === 'semantic' && (index === 0 || index === options.length - 1)) ? 
          options[index]?.label || `Opção ${index + 1}` : '',
        value: options[index]?.value || (index + 1).toString()
      }));

    setValue("options", generatedOptions);
  }, [element, setValue, options]);
  

  function applyChanges(values: propertiesFormSchemaType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });

    setSelectedElement(null);
  }

  function FieldRenderer({ field, fieldState, labelText }) {
    return (
      <FormItem>
        <FormLabel>{labelText}</FormLabel>
        <FormControl>
          <>
            <Input {...field} />
            {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
          </>
        </FormControl>
      </FormItem>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(applyChanges)} className="space-y-3">

        <FormField control={control} name="label" render={props => FieldRenderer({...props, labelText: "Título"})} />
        <FormField control={control} name="helperText" render={props => FieldRenderer({...props, labelText: "Texto de Apoio"})} />

        {options.map((option, index) => (
          <React.Fragment key={index}>
            {(element.extraAttributes.scaleType !== 'semantic' || index === 0 || index === options.length - 1) && (
              <FormField
                control={control}
                name={`options.${index}.label`}
                render={props => FieldRenderer({...props, labelText: `Descrição para Opção ${index + 1}`})}
              />
            )}
          </React.Fragment>
        ))}
          
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  );
}


