"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
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

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<TemplateElementInstance[]>([]);
  const [selectedElement, setSelectedElement] = useState<TemplateElementInstance | null>(null);

  const addElement = (index: number, element: TemplateElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: TemplateElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,

        selectedElement,
        setSelectedElement,

        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}