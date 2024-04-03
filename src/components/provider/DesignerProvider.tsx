import { ReactNode, useState } from "react";
import DesignerContext from "@/components/context/DesignerContext";
import { TemplateElementInstance } from "@/components/template/TemplateElements";

const DesignerProvider = ({ children }: { children: ReactNode }) => {
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

export default DesignerProvider;