"use client";

import React, { useState } from "react";
import { ElementsType, TemplateElements, TemplateElementInstance } from "@/components/template/TemplateElements";
import { Button } from "@/components/ui/button";
import useDesigner from "@/components/hooks/useDesigner";
import DesignerSidebar from "@/components/template/DesignerSidebar";
import { cn } from "@/lib/utils";
import { idGenerator } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { Trash2 } from 'lucide-react';
import { getById } from "@/lib/firebase";

const Designer = ({ uid }: { uid: string }) => {
  const { elements, addElement, selectedElement, setSelectedElement, removeElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const type = active.data?.current?.type as ElementsType;
      const isDesignerButtonElement = active.data?.current?.isDesignerButtonElement;
      const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;

      const droppingSidebarButtonOverDesignerDropArea = isDesignerButtonElement && isDroppingOverDesignerDropArea;

      // Primeiro cenário
      if (droppingSidebarButtonOverDesignerDropArea) {
        let newElement;
        if (type === "OptionsField") {
          const data = await getById(uid, "template");
          newElement = TemplateElements[type].construct(idGenerator(), {
            scaleType: data.scale_type,
            questionsSize: data.questions_size,
          });
        } else {
          newElement = TemplateElements[type].construct(idGenerator());
        }
  
        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarButtonOverDesignerElement = isDesignerButtonElement && isDroppingOverDesignerElement;

      // Segundo cenário
      if (droppingSidebarButtonOverDesignerElement) {
        let newElement;
        const overId = over.data?.current?.elementId;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("element not found");
        }
        
        if (type === "OptionsField") {
          const data = await getById(uid, "template"); 
          newElement = TemplateElements[type].construct(idGenerator(), {
            scaleType: data.scale_type,
            questionsSize: data.questions_size,
          });
        } else {
          newElement = TemplateElements[type].construct(idGenerator());
        }
        
        let indexForNewElement = overElementIndex; // Assume que está na metade superior
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement += 1; // Adiciona abaixo do elemento atual
        }
        
        addElement(indexForNewElement, newElement);
      }

      // Terceiro cenário
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex((el) => el.id === activeId);

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex; // Metade superior
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "flex flex-col flex-grow items-center justify-start flex-1 max-w-[920px] h-full m-auto rounded-xl overflow-y-auto bg-primary-background shadow-inner shadow-slate-800/40 dark:shadow-slate-800",
            droppable.isOver && "ring-4 ring-primary ring-inset",
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Solte aqui</p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="min-h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col  w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: TemplateElementInstance }) {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();

  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null; // Remover temporariamente o elemento do designer

  const DesignerElement = TemplateElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative min-h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset p-2"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div ref={topHalf.setNodeRef} className="absolute left-0 top-0 w-full h-1/2 rounded-t-md" />
      <div ref={bottomHalf.setNodeRef} className="absolute w-full left-0 bottom-0 h-1/2 rounded-b-md" />
      {mouseIsOver && (
        <>
          <div className="absolute top-0 right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation(); // Evite a seleção do elemento durante a exclusão
                removeElement(element.id);
              }}
            >
              <Trash2  className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">Clique nas propriedades ou arraste para mover</p>
          </div>
        </>
      )}
      {topHalf.isOver && <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />}
      <div
        className={cn(
          "flex w-full min-h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30",
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />}
    </div>
  );
}

export default Designer;