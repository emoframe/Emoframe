'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import useDesigner from "@/components/hooks/useDesigner";
import { TemplateElements } from "@/components/template/TemplateElements";
import { ScanEye } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const PreviewTemplateButton = () => {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <ScanEye className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">Visualização de Template</p>
          <p className="text-sm text-muted-foreground">É assim que o este template aparecerá para os usuários</p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const TemplateElement = TemplateElements[element.type].templateComponent;
              return <TemplateElement key={element.id} elementInstance={element} />;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewTemplateButton;