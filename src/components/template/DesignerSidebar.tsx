import React from "react";
import useDesigner from "@/components/hooks/useDesigner";
import TemplateElementsSidebar from "@/components/template/TemplateElementsSidebar";
import PropertiesTemplateSidebar from "@/components/template/PropertiesTemplateSidebar";


const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="w-[400px] max-w-[400px] h-full overflow-y-auto flex flex-col flex-grow gap-2 p-4 bg-primary-background shadow-md shadow-slate-800/40 dark:shadow-slate-800">
      {!selectedElement && <TemplateElementsSidebar />}
      {selectedElement && <PropertiesTemplateSidebar />}
    </aside>
  );
}

export default DesignerSidebar;