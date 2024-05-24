"use client";

import { ElementsType, TemplateElement, TemplateElementInstance } from "@/components/template/TemplateElements";
import { Label } from "@/components/ui/label";

import { RiSeparator } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldTemplateElement: TemplateElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerButtonElement: {
    icon: RiSeparator,
    label: "Separador",
  },
  designerComponent: DesignerComponent,
  templateComponent: TemplateComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function DesignerComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Separador</Label>
      <Separator />
    </div>
  );
}

function TemplateComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  return <Separator />;
}

function PropertiesComponent({ elementInstance }: { elementInstance: TemplateElementInstance }) {
  return <p>Não há propriedades para esse elemento</p>;
}