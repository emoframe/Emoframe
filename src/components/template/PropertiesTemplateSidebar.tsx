import React from "react";
import useDesigner from "@/components/hooks/useDesigner";
import { TemplateElements } from "./TemplateElements";
import { LucideMessageCircleX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PropertiesTemplateSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesTemplate = TemplateElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Propriedades do elemento</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <LucideMessageCircleX />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesTemplate elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesTemplateSidebar;