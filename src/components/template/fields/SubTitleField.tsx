"use client";

import { ElementsType, TemplateElement, TemplateElementInstance } from "@/components/template/TemplateElements";
import useDesigner from "@/components/hooks/useDesigner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Heading } from 'lucide-react';

const type: ElementsType = "SubTitleField";

const extraAttributes = {
  subtitle: "Subtítulo",
};

const propertiesSchema = z.object({
  subtitle: z.string().min(2).max(50),
});

export const SubTitleFieldTemplateElement: TemplateElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Heading,
    label: "Subtítulo",
  },
  designerComponent: DesignerComponent,
  templateComponent: TemplateComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

type CustomInstance = TemplateElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { subtitle } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Subtítulo</Label>
      <p className="text-lg">{subtitle}</p>
    </div>
  );
}

function TemplateComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  const element = elementInstance as CustomInstance;

  const { subtitle } = element.extraAttributes;
  return <p className="font-bold text-lg self-center">{subtitle}</p>;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      subtitle: element.extraAttributes.subtitle,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { subtitle } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        subtitle,
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
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtítulo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}