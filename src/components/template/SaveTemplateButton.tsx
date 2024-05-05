'use client';
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useDesigner from "@/components/hooks/useDesigner";
import { Save, Loader2 } from 'lucide-react';
import { saveTemplate } from "@/lib/firebase";

const SaveTemplateButton = ({ uid }: { uid: string }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();
  const { toast } = useToast();

  const updateTemplateContent = async () => {
    try {
      saveTemplate(elements, uid).then(() => {
        toast({
          title: "Sucesso",
          description: "Seu template foi salvo",
        });
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
        startTransition(updateTemplateContent);
      }}
    >
      <Save className="h-4 w-4" />
      Salvar
      {loading && <Loader2 className="animate-spin" />}
    </Button>
  );
}

export default SaveTemplateButton;