import React from "react";
import useDesigner from "@/components/hooks/useDesigner";
import TemplateElementsSidebar from "@/components/template/TemplateElementsSidebar";
import PropertiesTemplateSidebar from "@/components/template/PropertiesTemplateSidebar";

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <TemplateElementsSidebar />}
      {selectedElement && <PropertiesTemplateSidebar />}
    </aside>
  );
}

export default DesignerSidebar;