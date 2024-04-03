"use client";

import { useContext } from "react";
import DesignerContext from "@/components/context/DesignerContext";

const useDesigner = () => {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("useDesigner deve estar dentro de um DesignerContext");
  }

  return context;
}

export default useDesigner;