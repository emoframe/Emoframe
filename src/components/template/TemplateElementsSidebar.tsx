import React from "react";
import SidebarButtonElement from "@/components/template/SidebarButtonElement";
import { TemplateElements } from "@/components/template/TemplateElements";
import { Separator } from "@/components/ui/separator";


const TemplateElementsSidebar = () => {
  return (
    <div>
      <p className="text-sm text-foreground/70">Elementos Arrasta e Solta</p>

      <Separator className="mt-2 mb-4" />
      <p className="text-sm text-foreground/70 mb-2">Elementos de Layout</p>

      <div className="flex flex-col gap-2 mb-2">
        <SidebarButtonElement element={TemplateElements.TitleField} />
        <SidebarButtonElement element={TemplateElements.SubTitleField} />
        <SidebarButtonElement element={TemplateElements.SpacerField} />
        <SidebarButtonElement element={TemplateElements.SeparatorField} />
        <SidebarButtonElement element={TemplateElements.ParagraphField} />
      </div>
      
      <Separator className="mt-2 mb-4" />
      <p className="text-sm text-foreground/70 mb-2">Elementos de Formulário</p>

      <div className="flex flex-col gap-2">
        <SidebarButtonElement element={TemplateElements.OptionsField} />
      </div>
    </div>
  );
}

export default TemplateElementsSidebar