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

const type: ElementsType = "TitleField";

const extraAttributes = {
  title: "Título",
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export const TitleFieldTemplateElement: TemplateElement = {
  type,
  construct: (id: string, uid: string) => ({
    id,
    uid,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Heading,
    label: "Título",
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
  const { title } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Título</Label>
      <p className="text-xl">{title}</p>
    </div>
  );
}

function TemplateComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  const element = elementInstance as CustomInstance;

  const { title } = element.extraAttributes;
  return <p className="text-xl">{title}</p>;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      title: element.extraAttributes.title,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { title } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title,
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
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