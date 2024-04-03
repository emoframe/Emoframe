import React from "react";
import { TemplateElement } from "@/components/template/TemplateElements";
import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

const SidebarButtonElement = ({ element }: { element: TemplateElement }) => {
  const { label, icon: Icon } = element.designerButtonElement;
  const draggable = useDraggable({
    id: `designer-btn-${element.type}`,
    data: {
      type: element.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary",
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export function SidebarButtonElementDragOverlay({ element }: { element: TemplateElement }) {
  const { label, icon: Icon } = element.designerButtonElement;

  return (
    <Button variant={"outline"} className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab">
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default SidebarButtonElement;