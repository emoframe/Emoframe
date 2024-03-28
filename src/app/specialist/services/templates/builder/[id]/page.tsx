import TemplateBuilder from "@/components/TemplateBuilder";
import { getById } from "@/lib/firebase";
import React from "react";

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const template = await getById(id as string, "template");

  if (!template) {
    throw new Error("Template não encontrado");
  }
  return <TemplateBuilder template={template} />;
}

export default BuilderPage;