import React from "react";
import SidebarButtonElement from "@/components/template/SidebarButtonElement";
import { TemplateElements } from "@/components/template/TemplateElements";
import { Separator } from "@/components/ui/separator";


const TemplateElementsSidebar = () => {
  return (
    <div>
      <p className="text-sm text-foreground/70">Elementos Arrasta e Solta</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Elementos de Layout</p>
        <SidebarButtonElement element={TemplateElements.TitleField} />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Elementos de Formulário</p>
        {/*TODO */}
      </div>
    </div>
  );
}

export default TemplateElementsSidebar