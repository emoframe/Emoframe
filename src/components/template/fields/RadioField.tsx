"use client";

import { ElementsType, TemplateElement, TemplateElementInstance, SubmitFunction } from "@/components/template/TemplateElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "@/components/hooks/useDesigner";
import { CircleEllipsis } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const type: ElementsType = "RadioField";

const extraAttributes = {
  label: "Campo de Seleção",
  helperText: "Texto de Apoio",
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
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
      optionCount: params?.optionCount
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
    options: Array<{ value: string; description: string }>
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
  const { label, helperText } = element.extraAttributes;
  const id = `radio-${element.id}`;
  return (
    <div className="flex items-top space-x-2">
      <RadioGroup
        className="flex flex-row space-x-5 justify-between">
            {options.map((option, index) => (
                <div className="flex flex-col items-center space-y-2" key={index}>
                    <RadioGroupItem disabled value={option.value}/>
                    <Label className="font-normal text-md">
                        {option.label}
                    </Label>
                </div>
            ))}
        </RadioGroup>
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
        </Label>
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

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, placeHolder, helperText, options } = element.extraAttributes;
  const id = `radio-${element.id}`;

  return (
    <div className="flex flex-col space-y-4">
      <Label htmlFor={id} className={cn("font-bold", error && "text-red-500")}>
        {label}
      </Label>
      <RadioGroup
        aria-labelledby={id}
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue);
          if (!submitValue) return;
          const valid = RadioFieldTemplateElement.validate(element, newValue);
          setError(!valid);
          submitValue(element.id, newValue);
        }}
      >
        {options.map((option, index) => (
          <RadioGroupItem key={index} id={`${id}-${index}`} value={option.value}>
            {option.description}
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
  const { updateElement } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rótulo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                O rótulo do campo. <br /> Será exibido acima do campo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Texto de apoio</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper text of the field. <br />
                It will be displayed below the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}