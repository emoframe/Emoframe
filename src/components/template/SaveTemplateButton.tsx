'use client';
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from 'lucide-react';
import useDesigner from "@/hooks/useDesigner";
import { useToast } from "@/components/ui/use-toast";

const SaveTemplateButton = ({ id }: { id: string }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();
  const { toast } = useToast();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      // TODO: Conexão com o banco
      toast({
        title: "Sucesso",
        description: "Seu template foi salvo",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu algum problema",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <Save className="h-4 w-4" />
      Salvar
      {loading && <Loader2 className="animate-spin" />}
    </Button>
  );
}

export default SaveTemplateButton;