"use client";

import React, { useEffect, useState } from "react";
import PreviewTemplateButton from "@/components/template/PreviewTemplateButton"
import PublishTemplateButton from "@/components/template/PublishTemplateButton"
import SaveTemplateButton from "@/components/template/SaveTemplateButton"
import DragOverlayWrapper from "@/components/template/DragOverlayWrapper";
import Designer from "@/components/template/Designer";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Loader2, MoveLeft, MoveRight } from "lucide-react";
import useDesigner from "@/components/hooks/useDesigner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Confetti from "react-confetti";
import { Template } from "@/types/forms";
import BuilderPattern from "../pattern/BuilderPattern";
import PatternReceiver from "../pattern/PatternReceiver";


const TemplateBuilder = ({ template }: { template: Template }) => {
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    //TODO:
    /* 
    const elements = JSON.parse(template.content);
    setElements(elements);
    setSelectedElement(null);
    */
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [template, setElements, isReady, setSelectedElement]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    );
  }
  //TODO :
  //const shareUrl = `${window.location.origin}/submit/${template.shareURL}`;

  /*
  if (template.published) {
    return (
      <>
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              🎊🎊 Template publicado 🎊🎊
            </h1>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Agora será possível usá-lo em avaliações
            </h3>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/"} className="gap-2">
                  <MoveLeft />
                  Voltar para o início
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/templates/details/${template.uid}`} className="gap-2">
                  Detalhes
                  <MoveRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  */

  return (
    <DndContext sensors={sensors}>
      <section className="flex flex-col w-full">
        <nav className="flex justify-between p-4 gap-3 items-center bg-primary-background shadow-md shadow-slate-800/40 dark:shadow-slate-800">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Template:</span>
            {template.title}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewTemplateButton/>
            <SaveTemplateButton uid={template.uid as string} />
            <PublishTemplateButton uid={template.uid as string} />
          </div>
        </nav>
        <PatternReceiver Pattern={<BuilderPattern size={192} foreground="#6EA05A" />} backgroundColor="#D2EEC9">
          <Designer uid={template.uid as string}/>
        </PatternReceiver>
      </section>
      <DragOverlayWrapper/>
    </DndContext>
  );
}

export default TemplateBuilder;