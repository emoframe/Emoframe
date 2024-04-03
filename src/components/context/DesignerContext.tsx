"use client";

import { Dispatch, SetStateAction, createContext } from "react";
import { TemplateElementInstance } from "@/components/template/TemplateElements";

type DesignerContextType = {
  elements: TemplateElementInstance[];
  setElements: Dispatch<SetStateAction<TemplateElementInstance[]>>;
  addElement: (index: number, element: TemplateElementInstance) => void;
  removeElement: (id: string) => void;

  selectedElement: TemplateElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<TemplateElementInstance | null>>;

  updateElement: (id: string, element: TemplateElementInstance) => void;
};

const DesignerContext = createContext<DesignerContextType | null>(null);

export default DesignerContext;